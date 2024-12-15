import { db } from "@/db/drizzle";
import { projects } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { asc, sql } from "drizzle-orm/sql";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.userId, userId))
      .orderBy(asc(projects.order));

    return NextResponse.json(userProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, description, link, logo, banner, category, userId } = body;

    if (!name || !userId) {
      return NextResponse.json(
        { error: "Name and user ID are required" },
        { status: 400 }
      );
    }

    if (id) {
      const updatedProject = await db.update(projects)
        .set({
          name,
          description,
          link,
          logo,
          banner,
          category,
        })
        .where(and(eq(projects.id, id), eq(projects.userId, userId)))
        .returning();

      return NextResponse.json(updatedProject[0]);
    }

    const highestOrder = await db
      .select({ maxOrder: sql<number>`COALESCE(MAX(${projects.order}), -1)` })
      .from(projects)
      .where(eq(projects.userId, userId));

    const newOrder = (highestOrder[0]?.maxOrder ?? -1) + 1;

    const newProject = await db.insert(projects)
      .values({
        id: uuidv4(),
        name,
        description,
        link,
        logo,
        banner,
        category,
        userId,
        order: newOrder,
      })
      .returning();

    return NextResponse.json(newProject[0]);
  } catch (error) {
    console.error("Error creating/updating project:", error);
    return NextResponse.json(
      { error: "Failed to create/update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("id");
    const userId = searchParams.get("userId");

    if (!projectId || !userId) {
      return NextResponse.json(
        { error: "Project ID and user ID are required" },
        { status: 400 }
      );
    }

    await db.delete(projects)
      .where(and(
        eq(projects.id, projectId),
        eq(projects.userId, userId)
      ));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
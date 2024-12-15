import { db } from "@/db/drizzle";
import { projects } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const userProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.userId, userId));

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
    const { id, name, description, link, logo, category, userId } = body;

    if (!name || !userId) {
      return NextResponse.json(
        { error: "Name and user ID are required" },
        { status: 400 }
      );
    }

    // If ID exists, update the project
    if (id) {
      const updatedProject = await db.update(projects)
        .set({
          name,
          description,
          link,
          logo,
          category,
        })
        .where(eq(projects.id, id))
        .returning();

      return NextResponse.json(updatedProject[0]);
    }

    // Otherwise create a new project
    const project = await db.insert(projects).values({
      id: uuidv4(),
      name,
      description,
      link,
      logo,
      category,
      userId,
    }).returning();

    return NextResponse.json(project[0]);
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
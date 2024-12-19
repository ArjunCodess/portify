import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { projectsClicks, projects } from "@/db/schema";
import { nanoid } from "nanoid";
import { eq, sql } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { projectId } = await req.json();

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }
    
    await db.insert(projectsClicks).values({
      id: nanoid(),
      projectId,
      timestamp: Math.floor(Date.now() / 1000),
    });

    await db
      .update(projects)
      .set({ clickCount: sql`${projects.clickCount} + 1` })
      .where(eq(projects.id, projectId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking project click:", error);
    return NextResponse.json(
      { error: "Failed to track project click" },
      { status: 500 }
    );
  }
}

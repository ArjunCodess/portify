import { db } from "@/db/drizzle";
import { projects } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { projectIds } = await req.json();

    if (!Array.isArray(projectIds)) {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    for (let i = 0; i < projectIds.length; i++) {
      await db.update(projects)
        .set({ order: i })
        .where(eq(projects.id, projectIds[i]));
    }

    return new NextResponse("Projects reordered successfully", { status: 200 });
  } catch (error) {
    console.error("[PROJECTS_ORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

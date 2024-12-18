import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const dbUser = await db.query.user.findFirst({
      where: eq(user.id, userId),
    });

    return NextResponse.json({ theme: dbUser?.theme || "neutral" });
  } catch (error) {
    console.error("Error fetching theme:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { theme } = await req.json();
    if (!theme) {
      return new NextResponse("Theme is required", { status: 400 });
    }

    await db
      .update(user)
      .set({ theme })
      .where(eq(user.id, userId));

    return new NextResponse("Theme updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating theme:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

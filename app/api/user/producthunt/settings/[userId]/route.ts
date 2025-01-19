import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const { userId: authUserId } = await auth();
    
    if (!authUserId || authUserId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userData = await db.query.user.findFirst({
      where: eq(user.id, userId),
      columns: {
        showProductHunt: true,
      },
    });

    if (!userData) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ showProductHunt: userData.showProductHunt });
  } catch (error) {
    console.error("Error fetching Product Hunt settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch Product Hunt settings" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const { userId: authUserId } = await auth();
    
    if (!authUserId || authUserId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { showProductHunt } = body;

    if (typeof showProductHunt !== "boolean") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const updatedUser = await db
      .update(user)
      .set({ showProductHunt })
      .where(eq(user.id, userId))
      .returning();

    if (!updatedUser.length) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ showProductHunt: updatedUser[0].showProductHunt });
  } catch (error) {
    console.error("Error updating Product Hunt settings:", error);
    return NextResponse.json(
      { error: "Failed to update Product Hunt settings" },
      { status: 500 }
    );
  }
} 
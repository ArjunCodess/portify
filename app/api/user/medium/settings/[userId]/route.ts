import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  try {
    const userData = await db.query.user.findFirst({
      where: eq(user.id, userId),
      columns: {
        showMedium: true,
      },
    });

    if (!userData) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ showMedium: userData.showMedium });
  } catch (error) {
    console.error("Error fetching Medium settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch Medium settings" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  try {
    const { showMedium } = await request.json();

    await db
      .update(user)
      .set({ showMedium })
      .where(eq(user.id, userId));

    return NextResponse.json({ showMedium });
  } catch (error) {
    console.error("Error updating Medium settings:", error);
    return NextResponse.json(
      { error: "Failed to update Medium settings" },
      { status: 500 }
    );
  }
} 
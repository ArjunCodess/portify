import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userData = await db.query.user.findFirst({
      where: eq(user.id, params.userId),
      columns: {
        showDevto: true,
      },
    });

    if (!userData) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error fetching Dev.to settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch Dev.to settings" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await request.json();
    const { showDevto } = body;

    if (typeof showDevto !== "boolean") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    await db
      .update(user)
      .set({ showDevto })
      .where(eq(user.id, params.userId));

    return NextResponse.json({ showDevto });
  } catch (error) {
    console.error("Error updating Dev.to settings:", error);
    return NextResponse.json(
      { error: "Failed to update Dev.to settings" },
      { status: 500 }
    );
  }
} 
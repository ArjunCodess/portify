import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const userData = await db.query.user.findFirst({
      where: eq(user.id, userId),
      columns: {
        template: true,
      },
    });

    return NextResponse.json({ template: userData?.template || "minimal" });
  } catch (error) {
    console.error("Error fetching template:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const { template } = body;

    if (!template || !["minimal", "pristine", "vibrant", "elegant"].includes(template)) {
      return new NextResponse("Invalid template", { status: 400 });
    }

    await db.update(user)
      .set({ template })
      .where(eq(user.id, userId));

    return NextResponse.json({ template });
  } catch (error) {
    console.error("Error updating template:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

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
                font: true
            }
        });

        return NextResponse.json({ font: userData?.font || { heading: 'geist', content: 'geist' } });
    } catch (error) {
        console.error("[FONT_GET]", error);
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
        const { font } = body;

        if (!font || typeof font !== 'object' || !font.heading || !font.content) {
            return new NextResponse("Font object with heading and content is required", { status: 400 });
        }

        await db
            .update(user)
            .set({ font })
            .where(eq(user.id, userId));

        return NextResponse.json({ font });
    } catch (error) {
        console.error("[FONT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

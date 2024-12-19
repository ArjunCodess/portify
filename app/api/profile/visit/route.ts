import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { username } = await req.json();

        const dbUser = await db.query.user.findFirst({
            where: eq(user.username, username),
        });

        if (!dbUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        // Increment the visit count
        await db
            .update(user)
            .set({
                profileVisitCount: (dbUser.profileVisitCount || 0) + 1,
            })
            .where(eq(user.id, dbUser.id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error incrementing profile visit count:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

import { db } from "@/db/drizzle";
import { user, profileVisits } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        const { username } = await req.json();

        const dbUser = await db.query.user.findFirst({
            where: eq(user.username, username),
        });

        if (!dbUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        // Add a new visit record
        await db.insert(profileVisits).values({
            id: uuidv4(),
            userId: dbUser.id,
            timestamp: Math.floor(Date.now() / 1000)
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error recording profile visit:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

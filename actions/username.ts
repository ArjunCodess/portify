'use server';

import { db } from "@/db/drizzle";
import { user as userSchema } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createUsername(email: string, username: string, name: string, id: string) {
  try {
    await db.insert(userSchema).values({
      id,
      name,
      email,
      username,
    });
    return { success: true };
  } catch {
    return { success: false, error: 'Username already taken' };
  }
}

export async function checkUsernameAvailable(username: string) {
  const result = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.username, username));
  
  return result.length === 0;
}

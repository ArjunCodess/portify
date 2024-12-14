'use server';

import { db } from "@/db/drizzle";
import { user as userSchema } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function checkUserExists(email: string) {
  const result = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, email));
  
  return result.length > 0;
}

export async function getUserByEmail(email: string) {
  const result = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, email));
  
  return result[0];
}
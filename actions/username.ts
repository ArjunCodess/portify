'use server';

import { db } from "@/db/drizzle";
import { user as userSchema } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createUsername(
  email: string,
  username: string,
  name: string,
  id: string,
  template: string = 'minimal',
  theme: string = 'system',
  headingFont: string = 'geist',
  contentFont: string = 'geist'
) {
  try {
    await db.insert(userSchema).values({
      id,
      name,
      email,
      username,
      template: template as 'minimal' | 'pristine' | 'vibrant' | 'elegant',
      theme,
      font: {
        heading: headingFont,
        content: contentFont
      }
    });
    return { success: true };
  } catch (error) {
    console.error('Error creating user:', error);
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

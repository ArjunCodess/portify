'use server';

import { db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';
import { user as userSchema } from '@/db/schema';

export async function getUserDataByUsername(username: string) {
  if (!username) return [];
  
  const res = await db.query.user.findMany({
    with: {
      projects: true,
    },
    where: eq(userSchema.username, username),
  });
  return res;
}
'use server';

import { db } from '@/db/drizzle';
import { eq, sql } from 'drizzle-orm';
import { user as userSchema, profileVisits } from '@/db/schema';

export async function getUserDataByUsername(username: string) {
  if (!username) return [];
  
  const userData = await db.query.user.findMany({
    with: {
      projects: true,
    },
    where: eq(userSchema.username, username),
  });

  if (userData.length > 0) {
    // Get visit count for the user
    const visitCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(profileVisits)
      .where(eq(profileVisits.userId, userData[0].id));

    return [{
      ...userData[0],
      visitCount: Number(visitCount[0]?.count || 0)
    }];
  }

  return [];
}
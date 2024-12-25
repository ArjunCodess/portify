import { db } from '@/db/drizzle'
import { user } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

type UserUpdateData = {
  name?: string;
  username?: string;
  tagline?: string | null;
  bio?: string | null;
  twitter?: string | null;
  github?: string | null;
  link?: string | null;
  location?: string | null;
  profilePicture?: string | null;
  skills?: string[];
  theme?: string;
  template?: 'minimal' | 'pristine' | 'vibrant' | 'elegant';
  font?: { heading: string; content: string };
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const userData = await db.query.user.findFirst({
      where: eq(user.id, userId),
    })

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(userData)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params
    const updates = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Get current user data
    const currentUser = await db.query.user.findFirst({
      where: eq(user.id, userId),
    })

    if (!currentUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Only update fields that are provided in the request
    const updateData: UserUpdateData = {};
    
    // Only allow known fields to be updated
    (Object.keys(updates) as Array<keyof UserUpdateData>).forEach((key) => {
      if (updates[key] !== undefined && key in currentUser) {
        updateData[key] = updates[key];
      }
    });

    const updatedUser = await db
      .update(user)
      .set(updateData)
      .where(eq(user.id, userId))
      .returning()

    return NextResponse.json(updatedUser[0])
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

const DEVTO_API_URL = "https://dev.to/api";

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  positive_reactions_count: number;
  comments_count: number;
  cover_image: string | null;
  tag_list: string[];
  reading_time_minutes: number;
}

async function fetchDevToData(devtoUsername: string) {
  try {
    // Fetch user's articles (get more articles to find the top ones)
    const articlesResponse = await fetch(
      `${DEVTO_API_URL}/articles?username=${devtoUsername}&per_page=30`
    );
    
    if (!articlesResponse.ok) {
      throw new Error("Failed to fetch Dev.to articles");
    }

    const allArticles = (await articlesResponse.json()) as DevToArticle[];

    // Sort articles by reactions and get top 4
    const articles = allArticles
      .sort((a, b) => b.positive_reactions_count - a.positive_reactions_count)
      .slice(0, 4);

    // Calculate total reactions from all articles
    const totalReactions = allArticles.reduce(
      (sum, article) => sum + article.positive_reactions_count,
      0
    );

    return {
      articles,
      totalArticles: allArticles.length,
      totalReactions,
    };
  } catch (error) {
    console.error("Dev.to API error:", error);
    throw new Error("Failed to fetch Dev.to data");
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const userData = await db.query.user.findFirst({
      where: eq(user.username, params.username),
      columns: {
        devto: true,
        showDevto: true,
      },
    });

    if (!userData) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (!userData.showDevto) {
      return NextResponse.json(
        { error: "Dev.to articles are not enabled for this user" },
        { status: 403 }
      );
    }

    if (!userData.devto) {
      return NextResponse.json(
        { error: "Dev.to username not set" },
        { status: 404 }
      );
    }

    const data = await fetchDevToData(userData.devto);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Dev.to data:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch Dev.to data" },
      { status: 500 }
    );
  }
} 
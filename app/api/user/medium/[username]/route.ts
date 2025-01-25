import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { XMLParser } from "fast-xml-parser";

interface RSSItem {
  guid: {
    "#text": string;
    "@_isPermaLink": string;
  } | string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  "content:encoded": string;
  category: string | string[];
}

interface RSSFeed {
  rss: {
    channel: {
      item: RSSItem[];
    };
  };
}

async function fetchMediumData(mediumUsername: string) {
  try {
    // Medium's RSS feed URL
    const rssUrl = `https://medium.com/feed/@${mediumUsername}`;
    
    // First fetch the RSS feed
    const response = await fetch(rssUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch Medium RSS feed");
    }
    
    const text = await response.text();
    
    // Parse XML to JSON
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });
    const result = parser.parse(text) as RSSFeed;
    
    // Extract articles from the parsed RSS feed
    const items = result.rss?.channel?.item || [];
    const articles = items.map((item: RSSItem) => {
      // Get content and extract first image if exists
      const content = item["content:encoded"] || "";
      const coverImage = content.match(/<img[^>]+src="([^">]+)"/)?.[1] || null;
      
      // Get categories/tags
      const categories = Array.isArray(item.category) ? item.category : [item.category].filter(Boolean);
      
      // Extract reading time from content
      const readingTimeMatch = content.match(/(\d+)\s+min\s+read/);
      const readingTime = readingTimeMatch ? parseInt(readingTimeMatch[1]) : 5;

      // Handle guid which can be either a string or an object
      const guid = typeof item.guid === 'string' ? item.guid : item.guid?.["#text"] || item.link;
      
      // Extract description from content - get first paragraph after image
      const descriptionMatch = content.match(/<p>(.*?)<\/p>/);
      const description = descriptionMatch ? descriptionMatch[1].replace(/<[^>]*>/g, "") : "";
      
      return {
        id: guid,
        title: item.title || "",
        description: description,
        url: item.link || "",
        publishedAt: item.pubDate || "",
        coverImage,
        tags: categories,
        readingTime,
        // Note: Medium's RSS feed doesn't provide claps and responses,
        // so we'll set default values
        claps: 0,
        responseCount: 0
      };
    });

    return {
      articles: articles.slice(0, 4), // Get latest 4 articles
      totalArticles: articles.length,
      totalClaps: 0 // Not available through RSS
    };
  } catch (error) {
    console.error("Error fetching Medium data:", error);
    throw error;
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  
  try {
    const userData = await db.query.user.findFirst({
      where: eq(user.username, username),
      columns: {
        medium: true,
        showMedium: true,
      },
    });

    if (!userData) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (!userData.showMedium) {
      return NextResponse.json(
        { error: "Medium articles are not enabled for this user" },
        { status: 403 }
      );
    }

    if (!userData.medium) {
      return NextResponse.json(
        { error: "Medium username not set" },
        { status: 404 }
      );
    }

    const data = await fetchMediumData(userData.medium);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Medium data:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch Medium data" },
      { status: 500 }
    );
  }
}
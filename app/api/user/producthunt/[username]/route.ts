import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

const PRODUCT_HUNT_API_URL = "https://api.producthunt.com/v2/api/graphql";

interface ProductHuntGraphQLResponse {
  data?: {
    user?: {
      madePosts: {
        edges: Array<{
          node: {
            id: string;
            name: string;
            tagline: string;
            url: string;
            thumbnail?: {
              url: string;
            };
            votesCount: number;
            commentsCount: number;
            createdAt: string;
          };
        }>;
      };
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

interface ProductLaunch {
  id: string;
  name: string;
  tagline: string;
  url: string;
  thumbnail: string;
  votesCount: number;
  commentsCount: number;
  launchedAt: string;
}

interface ProductHuntData {
  launches: ProductLaunch[];
  totalUpvotes: number;
  totalLaunches: number;
}

async function fetchProductHuntData(productHuntUsername: string): Promise<ProductHuntData> {
  if (!process.env.PRODUCT_HUNT_API_TOKEN) {
    throw new Error("Product Hunt access token is not configured");
  }

  const query = `
    query($username: String!) {
      user(username: $username) {
        madePosts(first: 10) {
          edges {
            node {
              id
              name
              tagline
              url
              thumbnail {
                url
              }
              votesCount
              commentsCount
              createdAt
            }
          }
        }
      }
    }
  `;

  const response = await fetch(PRODUCT_HUNT_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.PRODUCT_HUNT_API_TOKEN}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { username: productHuntUsername.replace("@", "") },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Product Hunt API error:", error);
    throw new Error("Product Hunt API request failed");
  }

  const { data, errors }: ProductHuntGraphQLResponse = await response.json();
  
  if (errors) {
    console.error("Product Hunt GraphQL errors:", errors);
    throw new Error(errors[0]?.message || "GraphQL query failed");
  }

  if (!data?.user) {
    throw new Error("Invalid Product Hunt username or missing data");
  }

  const launches = data.user.madePosts.edges
    .map((edge) => ({
      id: edge.node.id,
      name: edge.node.name,
      tagline: edge.node.tagline,
      url: edge.node.url,
      thumbnail: edge.node.thumbnail?.url || "",
      votesCount: edge.node.votesCount,
      commentsCount: edge.node.commentsCount,
      launchedAt: edge.node.createdAt,
    }))
    .sort((a, b) => b.votesCount - a.votesCount);

  const totalUpvotes = launches.reduce((sum, launch) => sum + launch.votesCount, 0);

  return {
    launches,
    totalUpvotes,
    totalLaunches: launches.length,
  };
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
        productHunt: true,
        showProductHunt: true,
      },
    });

    if (!userData) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (!userData.showProductHunt) {
      return NextResponse.json(
        { error: "Product Hunt showcase is not enabled for this user" },
        { status: 403 }
      );
    }

    if (!userData.productHunt) {
      return NextResponse.json(
        { error: "Product Hunt username not set" },
        { status: 404 }
      );
    }

    const data = await fetchProductHuntData(userData.productHunt);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Product Hunt data:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch Product Hunt data" },
      { status: 500 }
    );
  }
} 
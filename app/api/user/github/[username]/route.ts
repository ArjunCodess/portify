import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

const GITHUB_API_URL = "https://api.github.com/graphql";

async function fetchGitHubData(githubUsername: string) {
  if (!process.env.GITHUB_ACCESS_TOKEN) {
    throw new Error("GitHub access token is not configured");
  }

  const query = `
    query($userName: String!) {
      user(login: $userName) {
        repositories(privacy: PUBLIC) {
          totalCount
        }
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
            }
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(GITHUB_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { userName: githubUsername },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("GitHub API error:", error);
    throw new Error("GitHub API request failed");
  }

  const { data, errors } = await response.json();
  
  if (errors) {
    console.error("GitHub GraphQL errors:", errors);
    throw new Error(errors[0]?.message || "GraphQL query failed");
  }

  if (!data?.user) {
    throw new Error("Invalid GitHub username or missing data");
  }

  return {
    totalRepositories: data.user.repositories.totalCount,
    pinnedRepositories: data.user.pinnedItems.nodes,
    contributions: data.user.contributionsCollection.contributionCalendar,
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
        github: true,
        showGithub: true,
      },
    });

    if (!userData) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (!userData.showGithub) {
      return NextResponse.json(
        { error: "GitHub contributions are not enabled for this user" },
        { status: 403 }
      );
    }

    if (!userData.github) {
      return NextResponse.json(
        { error: "GitHub username not set" },
        { status: 404 }
      );
    }

    const data = await fetchGitHubData(userData.github);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
} 
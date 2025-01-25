"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, ArrowUpRight, Star, GitFork } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

interface GitHubChartProps {
  username: string;
  template: "minimal" | "pristine" | "vibrant" | "elegant";
  showGithub: boolean;
  headingFont: string;
}

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: {
    contributionDays: ContributionDay[];
  }[];
}

interface PinnedRepo {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

interface GitHubData {
  totalRepositories: number;
  pinnedRepositories: PinnedRepo[];
  contributions: ContributionCalendar;
}

export default function GitHubChart({
  username,
  template,
  showGithub,
  headingFont
}: GitHubChartProps) {
  const [data, setData] = useState<GitHubData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributions = async () => {
      if (!showGithub || !username) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/user/github/${username}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch GitHub data");
        }
        const githubData = await response.json();
        setData(githubData);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setError(error instanceof Error ? error.message : "Failed to load GitHub data");
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username, showGithub]);

  if (!showGithub) return null;

  if (loading) {
    return <Skeleton className="w-full h-32" />;
  }

  if (error || !data?.contributions?.weeks) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error || "Failed to load GitHub contributions"}
        </AlertDescription>
      </Alert>
    );
  }

  const getContributionColor = (count: number) => {
    if (count === 0) return "bg-gray-100 dark:bg-neutral-900";
    if (count <= 3) return "bg-green-100 dark:bg-green-900/30";
    if (count <= 6) return "bg-green-300 dark:bg-green-700/40";
    if (count <= 9) return "bg-green-500 dark:bg-green-500/50";
    return "bg-green-700 dark:bg-green-300/60";
  };

  const renderContributions = () => {
    if (!data?.contributions?.weeks?.length) {
      return <div>No contribution data available</div>;
    }

    return (
      <div className="space-y-4">
        <div className="w-full overflow-auto">
          <div className="min-w-fit">
            <div className="grid grid-cols-[repeat(53,1fr)] gap-1">
              {data.contributions.weeks.map((week, weekIndex: number) => (
                <div key={weekIndex} className="grid grid-rows-7 gap-1">
                  {week.contributionDays.map((day: ContributionDay, dayIndex: number) => {
                    const date = new Date(day.date);
                    return (
                      <div
                        key={dayIndex}
                        className={`w-3 h-3 rounded-sm ${getContributionColor(
                          day.contributionCount
                        )} transition-colors`}
                        title={`${
                          day.contributionCount
                        } contributions on ${date.toLocaleDateString()}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>
            {data.totalRepositories} Public Repositories
          </span>
          <span>
            {data.contributions.totalContributions.toLocaleString()} contributions
          </span>
        </div>
      </div>
    );
  };

  const getGithubUrl = (username: string) => {
    if (username.startsWith("https://github.com/")) return username;
    return `https://github.com/${username.replace("@", "")}`;
  };

  const renderGithubButton = () => {
    if (!data?.contributions?.weeks) return null;

    const baseClasses = "w-10 h-10 flex items-center justify-center transition-all duration-300";
    const buttonClasses = {
      minimal: `${baseClasses} rounded-full bg-background border border-input hover:bg-accent hover:text-accent-foreground`,
      pristine: `${baseClasses} rounded-full bg-background border border-border hover:bg-muted`,
      vibrant: `${baseClasses} rounded-full bg-background/50 dark:bg-background/5 border border-border hover:bg-accent hover:text-accent-foreground`,
      elegant: `${baseClasses} rounded-full bg-background border hover:bg-background/90`,
    };

    return (
      <Link
        href={getGithubUrl(username)}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses[template]}
      >
        <ArrowUpRight className="w-5 h-5" />
      </Link>
    );
  };

  const renderPinnedRepos = () => {
    if (!data?.pinnedRepositories?.length) return null;

    return (
      <div className={`grid grid-cols-1 sm:grid-cols-${template === 'minimal' || template === 'pristine' ? '2' : '3'} gap-4 mt-8`}>
        {data.pinnedRepositories.map((repo) => (
          <Link
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg border bg-background/50 hover:bg-background/80 relative flex flex-col min-h-[140px] hover:ring-4 hover:ring-border transition-all duration-150"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-start justify-between">
                <h4 className={`font-medium truncate text-lg font-${headingFont}`}>{repo.name}</h4>
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  {repo.stargazerCount > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {repo.stargazerCount}
                    </span>
                  )}
                  {repo.forkCount > 0 && (
                    <span className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {repo.forkCount}
                    </span>
                  )}
                </div>
              </div>
              {repo.description && (
                <p className="text-sm text-muted-foreground text-left line-clamp-2">
                  {repo.description}
                </p>
              )}
            </div>
            {repo.primaryLanguage && (
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: repo.primaryLanguage.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {repo.primaryLanguage.name}
                </span>
              </div>
            )}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <>
      {template === "minimal" && (
        <div className="mt-8 space-y-4 relative">
          <div className="absolute right-0 top-0">
            {renderGithubButton()}
          </div>
          <div className="text-center space-y-2">
            <h3 className={`text-3xl font-medium font-${headingFont}`}>
              GitHub Activity
            </h3>
            <p className="text-sm text-muted-foreground">
              Each green square represents a day of learning, building, and
              shipping code
            </p>
          </div>
          {renderContributions()}
          {renderPinnedRepos()}
        </div>
      )}

      {template === "pristine" && (
        <div className="bg-background/95 dark:bg-background/5 rounded-lg p-0 sm:p-6 sm:border border-border">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-3xl font-medium font-${headingFont}`}>
              GitHub Activity
            </h3>
            {renderGithubButton()}
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Each green square represents a day of learning, building, and
            shipping code
          </p>
          {renderContributions()}
          {renderPinnedRepos()}
        </div>
      )}

      {template === "vibrant" && (
        <div className="mt-8 p-6 text-left">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-3xl font-medium font-${headingFont}`}>
              GitHub Activity
            </h3>
            {renderGithubButton()}
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Each green square represents a day of learning, building, and
            shipping code
          </p>
          {renderContributions()}
          {renderPinnedRepos()}
        </div>
      )}

      {template === "elegant" && (
        <div className="mt-8 p-6 bg-gradient-to-r from-accent/40 dark:from-accent/20 to-background border border-border rounded-lg text-left">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-3xl font-medium font-${headingFont}`}>
              GitHub Activity
            </h3>
            {renderGithubButton()}
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Each green square represents a day of learning, building, and
            shipping code
          </p>
          {renderContributions()}
          {renderPinnedRepos()}
        </div>
      )}
    </>
  );
}
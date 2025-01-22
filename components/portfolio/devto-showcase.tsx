"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  ArrowUpRight,
  MessageCircle,
  Clock,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Badge } from "../ui/badge";
import Image from "next/image";

interface DevToShowcaseProps {
  username: string;
  template: "minimal" | "pristine" | "vibrant" | "elegant";
  showDevto: boolean;
  headingFont: string;
}

interface Article {
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

interface DevToData {
  articles: Article[];
  totalArticles: number;
  totalReactions: number;
}

export default function DevToShowcase({
  username,
  template,
  showDevto,
  headingFont,
}: DevToShowcaseProps) {
  const [data, setData] = useState<DevToData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!showDevto || !username) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/user/devto/${username}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch Dev.to data");
        }
        const devtoData = await response.json();
        setData(devtoData);
      } catch (error) {
        console.error("Error fetching Dev.to data:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load Dev.to data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [username, showDevto]);

  if (!showDevto) return null;

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="w-full aspect-[1.6/1]" />
        <Skeleton className="w-full aspect-[1.6/1]" />
      </div>
    );
  }

  if (error || !data?.articles) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error || "Failed to load Dev.to articles"}
        </AlertDescription>
      </Alert>
    );
  }

  const getDevtoUrl = (username: string) => {
    if (username.startsWith("https://dev.to/")) return username;
    return `https://dev.to/${username.replace("@", "")}`;
  };

  const renderDevtoButton = () => {
    if (!data?.articles) return null;

    const baseClasses =
      "w-10 h-10 flex items-center justify-center transition-all duration-300";
    const buttonClasses = {
      minimal: `${baseClasses} rounded-full bg-background border border-input hover:bg-accent hover:text-accent-foreground`,
      pristine: `${baseClasses} rounded-full bg-background border border-border hover:bg-muted`,
      vibrant: `${baseClasses} rounded-full bg-background/50 dark:bg-background/5 border border-border hover:bg-accent hover:text-accent-foreground`,
      elegant: `${baseClasses} rounded-full bg-background border hover:bg-background/90`,
    };

    return (
      <Link
        href={getDevtoUrl(username)}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses[template]}
      >
        <ArrowUpRight className="w-5 h-5" />
      </Link>
    );
  };

  const renderArticles = () => {
    if (!data?.articles?.length) {
      return <div>No articles available</div>;
    }

    return (
      <div
        className={`grid grid-cols-1 ${
          template === "vibrant" || template === "elegant"
            ? "sm:grid-cols-2"
            : ""
        } gap-4 text-left mt-auto`}
      >
        {data.articles.map((article) => (
          <Link
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-lg border bg-background hover:bg-accent/5 transition-colors relative overflow-hidden h-full"
          >
            <div className="relative w-full">
              {article.cover_image && (
                <Image
                  src={article.cover_image}
                  alt={article.title}
                  className="object-cover w-full h-full max-h-64"
                  width={500}
                  height={500}
                />
              )}
            </div>
            <div className="flex flex-col flex-grow p-6 space-y-4">
              <div className="flex-grow space-y-2">
                <h4
                  className={`font-medium text-xl font-${headingFont} line-clamp-2 group-hover:text-accent-foreground transition-colors`}
                >
                  {article.title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {article.description}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {article.tag_list.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-red-500">
                    ❤︎ {article.positive_reactions_count}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4" />
                      {article.comments_count}
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {article.reading_time_minutes} min read
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <>
      {template === "minimal" && (
        <div className="mt-8 space-y-6 relative">
          <div className="absolute right-0 top-0">{renderDevtoButton()}</div>
          <div className="text-center space-y-2">
            <h3 className={`text-3xl font-medium font-${headingFont}`}>
              Dev.to Articles
            </h3>
            <p className="text-sm text-muted-foreground">
              Sharing my thoughts and knowledge on Dev.to
            </p>
          </div>
          {renderArticles()}
        </div>
      )}

      {template === "pristine" && (
        <div className="bg-background/95 dark:bg-background/5 rounded-lg p-0 sm:p-6 sm:border border-border">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-3xl font-medium font-${headingFont}`}>
              Dev.to Articles
            </h3>
            {renderDevtoButton()}
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Sharing my thoughts and knowledge on Dev.to
          </p>
          {renderArticles()}
        </div>
      )}

      {template === "vibrant" && (
        <div className="mt-8 p-6 text-left">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-3xl font-medium font-${headingFont}`}>
              Dev.to Articles
            </h3>
            {renderDevtoButton()}
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Sharing my thoughts and knowledge on Dev.to
          </p>
          {renderArticles()}
        </div>
      )}

      {template === "elegant" && (
        <div className="mt-8 p-6 bg-gradient-to-r from-accent/40 dark:from-accent/20 to-background border border-border rounded-lg text-left">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-3xl font-medium font-${headingFont}`}>
              Dev.to Articles
            </h3>
            {renderDevtoButton()}
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Sharing my thoughts and knowledge on Dev.to
          </p>
          {renderArticles()}
        </div>
      )}
    </>
  );
}

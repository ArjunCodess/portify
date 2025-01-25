"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, ArrowUpRight, Clock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface MediumShowcaseProps {
  username: string;
  mediumUsername: string;
  template: "minimal" | "pristine" | "vibrant" | "elegant";
  showMedium: boolean;
  headingFont: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  coverImage: string | null;
  tags: string[];
  readingTime: number;
}

interface MediumData {
  articles: Article[];
  totalArticles: number;
  totalClaps: number;
}

export default function MediumShowcase({
  username,
  mediumUsername,
  template,
  showMedium,
  headingFont,
}: MediumShowcaseProps) {
  const [data, setData] = useState<MediumData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!showMedium || !username) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/user/medium/${username}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch Medium data");
        }
        const mediumData = await response.json();
        setData(mediumData);
      } catch (error) {
        console.error("Error fetching Medium data:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load Medium data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [username, showMedium]);

  if (!showMedium) return null;

  if (loading) {
    return <Skeleton className="w-full h-32" />;
  }

  if (error || !data?.articles) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error || "Failed to load Medium articles"}
        </AlertDescription>
      </Alert>
    );
  }

  const renderMediumButton = () => {
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
        href={`https://medium.com/@${mediumUsername}`}
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
            className="group flex flex-col rounded-lg border bg-background hover:bg-accent/5 relative overflow-hidden h-full hover:ring-4 hover:ring-border transition-all duration-150"
          >
            <div className="relative w-full">
              {article.coverImage && (
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  className="object-cover w-full h-full max-h-40 md:max-h-64"
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
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground justify-between">
                <div className="flex flex-wrap gap-1">
                  {article.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-muted hover:bg-muted"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readingTime} min read
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
          <div className="absolute right-0 top-0">{renderMediumButton()}</div>
          <div className="text-center space-y-2">
            <h3 className={`text-3xl font-medium font-${headingFont}`}>
              Medium Articles
            </h3>
            <p className="text-sm text-muted-foreground">
              Sharing my thoughts and insights on Medium
            </p>
          </div>
          {renderArticles()}
        </div>
      )}

      {template === "pristine" && (
        <div className="bg-background/95 dark:bg-background/5 rounded-lg p-0 sm:p-6 sm:border border-border">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-3xl font-medium font-${headingFont}`}>
              Medium Articles
            </h3>
            {renderMediumButton()}
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Sharing my thoughts and insights on Medium
          </p>
          {renderArticles()}
        </div>
      )}

      {template === "vibrant" && (
        <div className="mt-8 p-6 text-left">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-3xl font-medium font-${headingFont}`}>
              Medium Articles
            </h3>
            {renderMediumButton()}
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Sharing my thoughts and insights on Medium
          </p>
          {renderArticles()}
        </div>
      )}

      {template === "elegant" && (
        <div className="mt-8 p-6 bg-gradient-to-r from-accent/40 dark:from-accent/20 to-background border border-border rounded-lg text-left">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-3xl font-medium font-${headingFont}`}>
              Medium Articles
            </h3>
            {renderMediumButton()}
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Sharing my thoughts and insights on Medium
          </p>
          {renderArticles()}
        </div>
      )}
    </>
  );
}

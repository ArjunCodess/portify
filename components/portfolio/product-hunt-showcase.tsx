"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, ArrowUpRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import Image from "next/image";

interface ProductHuntShowcaseProps {
  username: string;
  template: "minimal" | "pristine" | "vibrant" | "elegant";
  showProductHunt: boolean;
  headingFont: string;
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

export default function ProductHuntShowcase({
  username,
  template,
  showProductHunt,
  headingFont,
}: ProductHuntShowcaseProps) {
  const [data, setData] = useState<ProductHuntData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductHuntData = async () => {
      if (!showProductHunt || !username) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/user/producthunt/${username}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Failed to fetch Product Hunt data"
          );
        }
        const productHuntData = await response.json();
        setData(productHuntData);
      } catch (error) {
        console.error("Error fetching Product Hunt data:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load Product Hunt data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProductHuntData();
  }, [username, showProductHunt]);

  if (!showProductHunt) return null;

  if (loading) {
    return <Skeleton className="w-full h-32" />;
  }

  if (error || !data?.launches) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error || "Failed to load Product Hunt launches"}
        </AlertDescription>
      </Alert>
    );
  }

  const getProductHuntUrl = (username: string) => {
    if (username.startsWith("https://www.producthunt.com/")) return username;
    return `https://www.producthunt.com/@${username.replace("@", "")}`;
  };

  const renderProductHuntButton = () => {
    if (!data?.launches) return null;

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
        href={getProductHuntUrl(username)}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses[template]}
      >
        <ArrowUpRight className="w-5 h-5" />
      </Link>
    );
  };

  const renderLaunches = () => {
    if (!data?.launches?.length) {
      return <div>No Product Hunt launches found</div>;
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>
            {data.totalLaunches} Product{data.totalLaunches !== 1 ? "s" : ""}{" "}
            Launched
          </span>
          <span>{data.totalUpvotes.toLocaleString()} Total Upvotes</span>
        </div>

        <div
          className={`grid grid-cols-1 ${
            template === "vibrant" || template === "elegant"
              ? "sm:grid-cols-2"
              : ""
          } gap-4 text-left mt-auto`}
        >
          {data.launches.map((launch) => (
            <Link
              key={launch.id}
              href={launch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg border bg-background/50 hover:bg-background/80 relative flex flex-col justify-center  hover:ring-4 hover:ring-border transition-all duration-150"
            >
              <div className="flex items-center gap-4">
                {launch.thumbnail && (
                  <div className="flex-shrink-0">
                    <Image
                      src={launch.thumbnail}
                      alt={launch.name}
                      width={80}
                      height={80}
                      className="rounded-lg"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0 my-auto">
                  <h4
                    className={`font-medium text-lg truncate font-${headingFont}`}
                  >
                    {launch.name}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {launch.tagline}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <span className="flex items-center gap-1 text-orange-500">
                      ▲ {launch.votesCount}
                    </span>
                    <span>
                      {new Date(launch.launchedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {template === "minimal" && (
        <div className="h-full flex flex-col justify-center">
          <div className="space-y-4 relative">
            <div className="absolute right-0 top-0">
              {renderProductHuntButton()}
            </div>
            <div className="text-center space-y-2">
              <h3 className={`text-3xl font-medium font-${headingFont}`}>
                Product Hunt
                <br className="block sm:hidden" /> Launches
              </h3>
              <p className="text-sm text-muted-foreground">
                Showcasing my products on Product Hunt
              </p>
            </div>
            {renderLaunches()}
          </div>
        </div>
      )}

      {template === "pristine" && (
        <div className="bg-background/95 dark:bg-background/5 rounded-lg p-0 sm:p-6 sm:border border-border">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-3xl font-medium font-${headingFont}`}>
              Product Hunt
              <br className="block sm:hidden" /> Launches
            </h3>
            {renderProductHuntButton()}
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Showcasing my products on Product Hunt
          </p>
          {renderLaunches()}
        </div>
      )}

      {template === "vibrant" && (
        <div className="mt-8 p-6 text-left">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-3xl font-medium font-${headingFont}`}>
              Product Hunt
              <br className="block sm:hidden" /> Launches
            </h3>
            {renderProductHuntButton()}
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Showcasing my products on Product Hunt
          </p>
          {renderLaunches()}
        </div>
      )}

      {template === "elegant" && (
        <div className="mt-8 p-6 bg-gradient-to-r from-accent/40 dark:from-accent/20 to-background border border-border rounded-lg text-left">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-3xl font-medium font-${headingFont}`}>
              Product Hunt
              <br className="block sm:hidden" /> Launches
            </h3>
            {renderProductHuntButton()}
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Showcasing my products on Product Hunt
          </p>
          {renderLaunches()}
        </div>
      )}
    </>
  );
}
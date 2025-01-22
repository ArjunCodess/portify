"use client";

import { useUser } from "@clerk/nextjs";
import React, { use, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile } from "./provider";
import UserDetails from "@/components/portfolio/user-details";
import ProjectDetails from "@/components/portfolio/project-details";
import TopBar from "@/components/portfolio/top-bar";
import { Separator } from "@/components/ui/separator";
import Socials from "@/components/portfolio/socials";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BlurFade from "@/components/ui/blur-fade";
import GitHubChart from "@/components/portfolio/github-chart";
import ProductHuntShowcase from "@/components/portfolio/product-hunt-showcase";
import DevToShowcase from "@/components/portfolio/devto-showcase";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

export default function Profile({ params }: PageProps) {
  const { isLoaded } = useUser();
  const { userData, loading } = useProfile();
  const resolvedParams = use(params);

  useEffect(() => {
    const incrementVisitCount = async () => {
      if (resolvedParams.username) {
        try {
          // Check if page is in an iframe
          const isInIframe = window.self !== window.top;
          // Check if we're in preview mode by checking the referrer
          const isPreview = window.location.pathname.includes("/preview");

          // Only increment if not in iframe and not in preview
          if (!isInIframe && !isPreview) {
            await fetch("/api/profile/visit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username: resolvedParams.username }),
            });
          }
        } catch (error) {
          console.error("Error incrementing visit count:", error);
        }
      }
    };

    incrementVisitCount();
  }, [resolvedParams.username]);

  if (!isLoaded || loading) {
    return (
      <div className="flex flex-col space-y-4 p-4 max-w-5xl mx-auto">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-72 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <svg
          className="w-16 h-16 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-lg font-semibold text-muted-foreground">
          User not found
        </p>
        <p className="text-sm text-muted-foreground">
          The requested profile could not be located.
        </p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <BlurFade delay={0.3} className={`font-${userData.font.content}`}>
      <TopBar username={resolvedParams.username} />
      <Separator />
      <div
        className={`p-4 md:p-8 mx-auto ${
          userData.template === "minimal"
            ? "lg:p-12 max-w-2xl"
            : userData.template === "pristine"
            ? "sm:border sm:rounded-lg sm:my-5 bg-muted-foreground/[0.01] dark:bg-muted-foreground/[0.03] max-w-3xl"
            : userData.template === "elegant"
            ? "max-w-screen-xl my-4"
            : userData.template === "vibrant"
            ? "max-w-screen-xl md:my-4"
            : "max-w-2xl"
        }`}
      >
        <UserDetails data={userData} />

        <BlurFade delay={0.6}>
          <Separator className="my-10" />
        </BlurFade>

        {userData.template !== "elegant" && (
          <>
            <Socials data={userData} />

            <BlurFade delay={0.9}>
              <Separator className="my-10" />
            </BlurFade>
          </>
        )}

        {userData.github && userData.showGithub && (
          <>
            <GitHubChart
              username={resolvedParams.username}
              template={userData.template}
              showGithub={userData.showGithub}
              headingFont={userData.font.heading}
            />

            <BlurFade delay={0.9}>
              <Separator className="my-10" />
            </BlurFade>
          </>
        )}

        {userData.productHunt && userData.showProductHunt && (
          <>
            <ProductHuntShowcase
              username={resolvedParams.username}
              template={userData.template}
              showProductHunt={userData.showProductHunt}
              headingFont={userData.font.heading}
            />

            <BlurFade delay={0.9}>
              <Separator className="my-10" />
            </BlurFade>
          </>
        )}

        {userData.devto && userData.showDevto && (
          <>
            <DevToShowcase
              username={resolvedParams.username}
              template={userData.template}
              showDevto={userData.showDevto}
              headingFont={userData.font.heading}
            />

            <BlurFade delay={0.9}>
              <Separator className="my-10" />
            </BlurFade>
          </>
        )}

        <ProjectDetails />
      </div>
    </BlurFade>
  );
}
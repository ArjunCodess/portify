"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getUserByEmail } from "@/actions/user";
import Editor from "@/components/editor";
import Preview from "@/components/preview";
import { Skeleton } from "@/components/ui/skeleton";

export default function Admin() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [portfolioUsername, setPortfolioUsername] = useState("");

  useEffect(() => {
    if (!isLoaded) return;

    const checkUser = async () => {
      try {
        const email = user?.primaryEmailAddress?.emailAddress;
        if (!email) {
          router.push("/create");
          return;
        }

        const userRecord = await getUserByEmail(email);
        if (!userRecord || !userRecord.id) {
          router.push("/create");
          return;
        }

        setPortfolioUsername(userRecord.username);
      } catch (error) {
        console.error("Error checking user:", error);
        router.push("/create");
      } finally {
        setIsChecking(false);
      }
    };

    checkUser();
  }, [user, router, isLoaded]);

  if (!isLoaded || isChecking) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full px-4">
        <div className="col-span-1 md:col-span-2">
          <Skeleton className="w-full h-[600px]" />
        </div>
        <div className="col-span-1">
          <Skeleton className="w-full h-[667px]" />
        </div>
      </section>
    );
  }

  return (
    <section className="h-full px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your admin dashboard. Here you can manage your portfolio
          content and settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2">
          <Editor />
        </div>
        <div className="col-span-1">
          <Preview username={portfolioUsername} />
        </div>
      </div>
    </section>
  );
}
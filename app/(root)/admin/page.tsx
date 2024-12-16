'use client';

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { checkUserExists } from "@/actions/user";
import Editor from "@/components/editor";
import Preview from "@/components/preview";
import { Skeleton } from "@/components/ui/skeleton";

export default function Admin() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    const checkUser = async () => {
      try {
        const email = user?.primaryEmailAddress?.emailAddress;
        if (!email) {
          router.push("/create");
          return;
        }

        const exists = await checkUserExists(email);
        if (!exists) {
          router.push("/create");
        }
      } catch (error) {
        console.error('Error checking user:', error);
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
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full px-4">
      <div className="col-span-1 md:col-span-2">
        <Editor />
      </div>
      <div className="col-span-1">
        <Preview username={user?.username ?? ''} />
      </div>
    </section>
  );
}
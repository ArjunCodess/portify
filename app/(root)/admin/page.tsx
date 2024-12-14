'use client';

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { checkUserExists } from "@/actions/user";
import Editor from "@/components/editor";
import Preview from "@/components/preview";

export default function Admin() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) {
        router.push("/create");
        return;
      }

      const exists = await checkUserExists(email);
      if (!exists) {
        router.push("/create");
      }
    };

    checkUser();
  }, [user, router]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="col-span-1 md:col-span-3">
        <Editor />
      </div>
      <div className="col-span-1">
        <Preview />
      </div>
    </section>
  );
}
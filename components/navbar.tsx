"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggler";
import { Button } from "./ui/button";
import Image from "next/image";
import { Home, PlusCircle, UserPen } from "lucide-react";
import { ExpandableTabs } from "./ui/expandable-tabs";
import { checkUserExists } from "@/actions/user";

const Navbar = () => {
  const { isLoaded, user } = useUser();
  const [mounted, setMounted] = useState(false);
  const [userExists, setUserExists] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function checkUser() {
      if (user?.emailAddresses[0]?.emailAddress) {
        const exists = await checkUserExists(user.emailAddresses[0].emailAddress);
        setUserExists(exists);
      }
    }
    
    if (user) {
      checkUser();
    }
  }, [user]);

  if (!mounted || !isLoaded) return null;

  const getTabs = () => {
    if (user && !userExists || !user) {
      return [
        { title: "Home", icon: Home },
        { title: "Create", icon: PlusCircle },
      ];
    }
    
    return [
      { title: "Home", icon: Home },
      { title: "Admin", icon: UserPen },
    ];
  };

  const tabs = getTabs();

  return (
    <div className="sticky inset-x-0 top-0 bg-background text-foreground z-[10] h-fit border-b py-2">
      <div className="flex items-center justify-between h-full gap-2 px-4 sm:px-8 mx-auto max-w-7xl">
        <Link href="/">
          <p className="flex items-center gap-2 sm:gap-4 rounded-lg border-black px-2 sm:px-4 py-1 text-lg sm:text-xl font-bold transition-all hover:scale-110 hover:rotate-2 hover:shadow-lg dark:border-white dark:hover:shadow-white/20 duration-300 ease-out hover:border-b">
            <Image src="/logo.svg" height={20} width={20} alt="Portify Logo" />
            <span className="hidden sm:inline">Portify</span>
          </p>
        </Link>
        <div className="flex-1 flex justify-center">
          <ExpandableTabs tabs={tabs} />
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <ModeToggle />
          {user ? (
            <UserButton />
          ) : (
            <SignInButton mode="modal">
              <Button size="sm">Sign In</Button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggler";
import { Button } from "./ui/button";
import Image from "next/image";

const Navbar = () => {
  const { isLoaded, user } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isLoaded) return null;

  return (
    <div className="sticky inset-x-0 top-0 bg-background text-foreground z-[10] h-fit border-b py-2">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        <Link href="/">
          <p className="flex items-center gap-4 rounded-lg border-black px-4 py-1 text-xl font-bold transition-all hover:scale-110 hover:rotate-2 hover:shadow-lg dark:border-white dark:hover:shadow-white/20 duration-300 ease-out hover:border-b">
            <Image src="/logo.svg" height={20} width={20} alt="SnapQuiz Logo" />
            Portify
          </p>
        </Link>
        <div className="flex items-center space-x-4">
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
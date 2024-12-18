"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ThemeOptions from "@/components/theme-options";
import { useEffect, useState } from "react";

export default function AdminStylesPage() {
  const { user: clerkUser, isLoaded } = useUser();
  const [currentTheme, setCurrentTheme] = useState<string>("neutral");

  useEffect(() => {
    const fetchUserTheme = async () => {
      if (!clerkUser?.id) return;

      try {
        const response = await fetch("/api/theme");
        if (!response.ok) {
          throw new Error("Failed to fetch theme");
        }
        const data = await response.json();
        setCurrentTheme(data.theme);
      } catch (error) {
        console.error("Error fetching theme:", error);
      }
    };

    fetchUserTheme();
  }, [clerkUser?.id]);

  const handleThemeChange = (newTheme: string) => {
    setCurrentTheme(newTheme);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!clerkUser) {
    redirect("/sign-in");
  }

  return (
    <div className="h-full w-full px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Styles</h1>
        <p className="text-muted-foreground">
          Customize the appearance of your portfolio by selecting a theme.
          Your current theme is: <span className="font-medium">{currentTheme}</span>.
        </p>
      </div>
      
      <ThemeOptions onThemeChange={handleThemeChange} />
    </div>
  );
}
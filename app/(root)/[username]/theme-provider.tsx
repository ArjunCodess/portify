'use client';

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useEffect } from "react";
import { useProfile } from "./provider";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { userData } = useProfile();

  useEffect(() => {
    if (!userData?.theme) return;
    
    // Force theme update
    document.documentElement.setAttribute('data-theme', userData.theme);
  }, [userData?.theme]);

  return (
    <NextThemeProvider
      attribute="data-theme"
      defaultTheme={userData?.theme || "neutral"}
      enableSystem={false}
    >
      {children}
    </NextThemeProvider>
  );
}
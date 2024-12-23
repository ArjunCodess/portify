"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ThemeOptions from "@/components/theme-options";
import TemplateOptions from "@/components/template-options";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function AdminStylesPage() {
  const { user: clerkUser, isLoaded } = useUser();
  const [currentTheme, setCurrentTheme] = useState<string>("neutral");
  const [currentTemplate, setCurrentTemplate] = useState<string>("minimal");

  useEffect(() => {
    const fetchUserSettings = async () => {
      if (!clerkUser?.id) return;

      try {
        const [themeResponse, templateResponse] = await Promise.all([
          fetch("/api/theme"),
          fetch("/api/template")
        ]);
        
        if (!themeResponse.ok || !templateResponse.ok) {
          throw new Error("Failed to fetch settings");
        }

        const themeData = await themeResponse.json();
        const templateData = await templateResponse.json();

        setCurrentTheme(themeData.theme);
        setCurrentTemplate(templateData.template);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchUserSettings();
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
          Customize the appearance of your portfolio by selecting a theme and
          template. Your current theme is:{" "}
          <span className="font-medium text-foreground">{currentTheme}</span> and your current
          template is: <span className="font-medium text-foreground">{currentTemplate}</span>.
        </p>
      </div>

      <Separator className="mb-8" />

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-6">Templates</h1>
          <TemplateOptions onTemplateChange={setCurrentTemplate} />
        </div>

        <Separator />

        <div>
          <h1 className="text-2xl font-bold mb-6">Color Palettes</h1>
          <ThemeOptions onThemeChange={handleThemeChange} />
        </div>
      </div>
    </div>
  );
}
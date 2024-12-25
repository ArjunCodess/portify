"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ThemeOptions from "@/components/theme-options";
import TemplateOptions from "@/components/template-options";
import FontOptions from "@/components/font-options";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function AdminStylesPage() {
  const { user: clerkUser, isLoaded } = useUser();
  const [currentTheme, setCurrentTheme] = useState<string>("neutral");
  const [currentTemplate, setCurrentTemplate] = useState<string>("minimal");
  const [currentFont, setCurrentFont] = useState<{ heading: string; content: string }>({
    heading: "geist",
    content: "geist",
  });

  useEffect(() => {
    const fetchUserSettings = async () => {
      if (!clerkUser?.id) return;

      try {
        const [themeResponse, templateResponse, fontResponse] =
          await Promise.all([
            fetch("/api/theme"),
            fetch("/api/template"),
            fetch("/api/font"),
          ]);

        if (!themeResponse.ok || !templateResponse.ok || !fontResponse.ok) {
          throw new Error("Failed to fetch settings");
        }

        const themeData = await themeResponse.json();
        const templateData = await templateResponse.json();
        const fontData = await fontResponse.json();

        setCurrentTheme(themeData.theme);
        setCurrentTemplate(templateData.template);
        setCurrentFont(fontData.font);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchUserSettings();
  }, [clerkUser?.id]);

  const handleThemeChange = (newTheme: string) => {
    setCurrentTheme(newTheme);
  };

  const handleFontChange = async (type: "heading" | "content", value: string) => {
    try {
      const newFont = { ...currentFont, [type]: value };
      const response = await fetch("/api/font", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ font: newFont }),
      });

      if (!response.ok) {
        throw new Error("Failed to update font");
      }

      setCurrentFont(newFont);
    } catch (error) {
      console.error("Error updating font:", error);
    }
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
        <h1 className="text-4xl font-medium font-eb-garamond mb-2">Styles</h1>
        <p className="text-muted-foreground">
          Customize the appearance of your portfolio by selecting a theme,
          template, and font.<br />Your current theme is:{" "}
          <span className="font-medium text-foreground">{currentTheme}</span>,
          your current template is:{" "}
          <span className="font-medium text-foreground">{currentTemplate}</span>
          , and your fonts are:{" "}
          <span className="font-medium text-foreground">{currentFont.heading}</span> for headings and{" "}
          <span className="font-medium text-foreground">{currentFont.content}</span> for content.
        </p>
      </div>

      <Separator className="mb-8" />

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-medium font-eb-garamond mb-6">Fonts</h1>
          <FontOptions
            onFontChange={(type, value) => handleFontChange(type, value)}
            currentFont={currentFont}
          />
        </div>

        <Separator />

        <div>
          <h1 className="text-3xl font-medium font-eb-garamond mb-6">Templates</h1>
          <TemplateOptions onTemplateChange={setCurrentTemplate} />
        </div>

        <Separator />

        <div>
          <h1 className="text-3xl font-medium font-eb-garamond mb-6">
            Color Palettes
          </h1>
          <ThemeOptions onThemeChange={handleThemeChange} />
        </div>
      </div>
    </div>
  );
}
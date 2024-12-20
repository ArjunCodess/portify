"use client";

import { themes } from '@/lib/themes';
import React from 'react';
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useToast } from '@/hooks/use-toast';

interface ThemeOptionsProps {
  onThemeChange?: (theme: string) => void;
}

export default function ThemeOptions({ onThemeChange }: ThemeOptionsProps) {
  const { setTheme, theme: currentTheme } = useTheme();
  const { toast } = useToast();

  const updateTheme = async (themeName: string) => {
    try {
      const response = await fetch("/api/theme", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ theme: themeName }),
      });

      if (!response.ok) {
        throw new Error("Failed to update theme");
      }

      setTheme(themeName);
      onThemeChange?.(themeName);
      
      toast({
        title: "Theme Updated",
        description: `Theme has been changed to ${themeName}`,
      });
    } catch (error) {
      console.error("Error updating theme:", error);
      toast({
        title: "Error",
        description: "Failed to update theme",
        variant: "destructive",
      });
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <div 
            key={theme.name}
            className="bg-card rounded-lg p-4 shadow-sm border w-full aspect-[4/1.4]"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">{theme.label}</h3>
            </div>
            <div className="flex rounded-md overflow-hidden h-[40%]">
              <div 
                className="w-1/4 border"
                style={{ backgroundColor: `#${theme.activeColor}` }}
              />
              <div 
                className="w-1/4 border"
                style={{ backgroundColor: `hsl(${theme.cssVars.light["--primary"]})` }}
              />
              <div 
                className="w-1/4 border"
                style={{ backgroundColor: `hsl(${theme.cssVars.light["--secondary"]})` }}
              />
              <div 
                className="w-1/4 border"
                style={{ backgroundColor: `hsl(${theme.cssVars.light["--accent"]})` }}
              />
            </div>
            <div className="flex rounded-md overflow-hidden mt-2 h-[40%]">
              <div 
                className="w-1/4 border"
                style={{ backgroundColor: `hsl(${theme.cssVars.dark["--primary"]})` }}
              />
              <div 
                className="w-1/4 border"
                style={{ backgroundColor: `hsl(${theme.cssVars.dark["--secondary"]})` }}
              />
              <div 
                className="w-1/4 border"
                style={{ backgroundColor: `hsl(${theme.cssVars.dark["--accent"]})` }}
              />
              <div 
                className="w-1/4 border"
                style={{ backgroundColor: `hsl(${theme.cssVars.dark["--background"]})` }}
              />
            </div>
            <Button
              variant="outline"
              className={cn(
                "gap-2 mt-4 w-full",
                currentTheme === theme.name && "border-2 border-primary"
              )}
              onClick={() => updateTheme(theme.name)}
            >
              <div
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: `#${theme.activeColor}` }}
              />
              Select {theme.label}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
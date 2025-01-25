"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PlatformToggleProps {
  title: string;
  description: string;
  platform: "github" | "producthunt" | "devto" | "medium";
}

const getPlatformKey = (platform: string) => {
  switch (platform) {
    case "producthunt":
      return "ProductHunt";
    case "devto":
      return "Devto";
    default:
      return platform.charAt(0).toUpperCase() + platform.slice(1);
  }
};

export default function PlatformToggle({ title, description, platform }: PlatformToggleProps) {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [showPlatform, setShowPlatform] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`/api/user/${platform}/settings/${userId}`);
        const data = await response.json();
        const key = `show${getPlatformKey(platform)}`;
        setShowPlatform(data[key]);
      } catch (error) {
        console.error(`Error fetching ${platform} settings:`, error);
        toast({
          title: "Error",
          description: `Failed to load ${platform} settings`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSettings();
    }
  }, [userId, platform, toast]);

  const handleToggle = async () => {
    setSaving(true);
    try {
      const key = `show${getPlatformKey(platform)}`;
      const response = await fetch(`/api/user/${platform}/settings/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [key]: !showPlatform,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update ${platform} settings`);
      }

      setShowPlatform(!showPlatform);
      toast({
        title: "Success",
        description: `${title} ${!showPlatform ? "enabled" : "disabled"}`,
      });
    } catch (error) {
      console.error(`Error updating ${platform} settings:`, error);
      toast({
        title: "Error",
        description: `Failed to update ${platform} settings`,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Split description to separate the username requirement
  const mainDescription = description.split("Please ensure")[0].trim();
  const tooltipContent = `Please ensure that your ${
    platform === "producthunt" ? "Product Hunt" : 
    platform === "devto" ? "Dev.to" : 
    platform === "github" ? "GitHub" :
    platform === "medium" ? "Medium" : 
    platform
  } username is entered in the basic information card above too.`;

  return (
    <Card className="flex flex-row items-center justify-between">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-2xl font-medium font-eb-garamond">{title}</CardTitle>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <span className="text-muted-foreground hover:text-foreground transition-colors cursor-help">
                  ⓘ
                </span>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{tooltipContent}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>{mainDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <Switch
          checked={showPlatform}
          onCheckedChange={handleToggle}
          disabled={saving}
        />
      </CardContent>
    </Card>
  );
} 
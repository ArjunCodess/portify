"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function GitHub() {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [showGithub, setShowGithub] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`/api/user/github/settings/${userId}`);
        const data = await response.json();
        setShowGithub(data.showGithub);
      } catch (error) {
        console.error("Error fetching GitHub settings:", error);
        toast({
          title: "Error",
          description: "Failed to load GitHub settings",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSettings();
    }
  }, [userId, toast]);

  const handleToggle = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/user/github/settings/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ showGithub: !showGithub }),
      });

      if (!response.ok) {
        throw new Error("Failed to update GitHub settings");
      }

      setShowGithub(!showGithub);
      toast({
        title: "Success",
        description: `GitHub contributions ${!showGithub ? "enabled" : "disabled"}`,
      });
    } catch (error) {
      console.error("Error updating GitHub settings:", error);
      toast({
        title: "Error",
        description: "Failed to update GitHub settings",
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

  return (
    <Card className="flex flex-row items-center justify-between">
      <CardHeader>
        <CardTitle className="text-3xl font-medium font-eb-garamond">GitHub Contributions</CardTitle>
        <CardDescription>
          Show your GitHub contributions chart on your portfolio.<br />Please ensure that your GitHub ID is entered in the basic information card above too.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Switch
          checked={showGithub}
          onCheckedChange={handleToggle}
          disabled={saving}
        />
      </CardContent>
    </Card>
  );
}
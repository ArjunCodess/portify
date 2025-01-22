"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function DevTo() {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [showDevto, setShowDevto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`/api/user/devto/settings/${userId}`);
        const data = await response.json();
        setShowDevto(data.showDevto);
      } catch (error) {
        console.error("Error fetching Dev.to settings:", error);
        toast({
          title: "Error",
          description: "Failed to load Dev.to settings",
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
      const response = await fetch(`/api/user/devto/settings/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ showDevto: !showDevto }),
      });

      if (!response.ok) {
        throw new Error("Failed to update Dev.to settings");
      }

      setShowDevto(!showDevto);
      toast({
        title: "Success",
        description: `Dev.to articles ${!showDevto ? "enabled" : "disabled"}`,
      });
    } catch (error) {
      console.error("Error updating Dev.to settings:", error);
      toast({
        title: "Error",
        description: "Failed to update Dev.to settings",
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
        <CardTitle className="text-3xl font-medium font-eb-garamond">Dev.to Articles</CardTitle>
        <CardDescription>
          Show your Dev.to articles on your portfolio.<br />Please ensure that your Dev.to username is entered in the basic information card above too.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Switch
          checked={showDevto}
          onCheckedChange={handleToggle}
          disabled={saving}
        />
      </CardContent>
    </Card>
  );
} 
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function ProductHunt() {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [showProductHunt, setShowProductHunt] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`/api/user/producthunt/settings/${userId}`);
        const data = await response.json();
        setShowProductHunt(data.showProductHunt);
      } catch (error) {
        console.error("Error fetching Product Hunt settings:", error);
        toast({
          title: "Error",
          description: "Failed to load Product Hunt settings",
          variant: "destructive",
        });
        setShowProductHunt(false);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSettings();
    }
  }, [userId, toast]);

  const handleToggle = async () => {
    if (showProductHunt === null) return;
    
    setSaving(true);
    try {
      const response = await fetch(`/api/user/producthunt/settings/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ showProductHunt: !showProductHunt }),
      });

      if (!response.ok) {
        throw new Error("Failed to update Product Hunt settings");
      }

      setShowProductHunt(!showProductHunt);
      toast({
        title: "Success",
        description: `Product Hunt showcase ${!showProductHunt ? "enabled" : "disabled"}`,
      });
    } catch (error) {
      console.error("Error updating Product Hunt settings:", error);
      toast({
        title: "Error",
        description: "Failed to update Product Hunt settings",
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
        <CardTitle className="text-3xl font-medium font-eb-garamond">Product Hunt Showcase</CardTitle>
        <CardDescription>
          Show your Product Hunt launches and achievements on your portfolio.<br />Please ensure that your Product Hunt username is entered in the basic information card above too.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Switch
          checked={showProductHunt === null ? false : showProductHunt}
          onCheckedChange={handleToggle}
          disabled={saving || showProductHunt === null}
        />
      </CardContent>
    </Card>
  );
} 
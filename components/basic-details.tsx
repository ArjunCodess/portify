"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";

export default function BasicDetails() {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    tagline: "",
    bio: "",
    twitter: "",
    github: "",
    link: "",
    location: "",
  });
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) {
      toast({
        title: "Error",
        description: "Please sign in to save changes",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save");
      }

      setIsDirty(false);
      toast({
        title: "Success",
        description: "Changes saved successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save changes",
        variant: "destructive",
      });
      console.error("Error saving changes:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        toast({
          title: "Error",
          description: "Please sign in to save changes",
          variant: "destructive",
        });
        return;
      }

      try {
        const response = await fetch(`/api/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch user data');
        }
        
        setFormData({
          name: data.name || '',
          username: data.username || '',
          tagline: data.tagline || '',
          bio: data.bio || '',
          twitter: data.twitter || '',
          github: data.github || '',
          link: data.link || '',
          location: data.location || '',
        });
      } catch (error) {
        console.error('Fetch error:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch user data",
        });
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId, toast]);

  useEffect(() => {
    let timeoutId: null | ReturnType<typeof setTimeout>;
    const saveChanges = async () => {
      if (!isDirty || !userId) return;

      try {
        const response = await fetch(`/api/user/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to save");
        }

        setIsDirty(false);
        toast({
          title: "Success",
          description: "Changes saved successfully",
          variant: "default",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to save changes",
          variant: "destructive",
        });
        console.error("Error saving changes:", error);
      }
    };

    if (isDirty) {
      timeoutId = setTimeout(saveChanges, 2000) as unknown as ReturnType<typeof setTimeout>;
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [formData, isDirty, userId, toast]);

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Basic Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Your username"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="tagline" className="text-sm font-medium">
              Tagline
            </label>
            <Input
              id="tagline"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="A brief description about you"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-medium">
              Bio
            </label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="twitter" className="text-sm font-medium">
                Twitter
              </label>
              <Input
                id="twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="Your Twitter handle (@username)"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="github" className="text-sm font-medium">
                GitHub
              </label>
              <Input
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="Your GitHub username (@username)"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="link" className="text-sm font-medium">
                Website
              </label>
              <Input
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="Your personal website"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location
              </label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Where are you based?"
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Save Details
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

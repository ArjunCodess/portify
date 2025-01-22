"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    productHunt: "",
    devto: "",
    link: "",
    location: "",
    profilePicture: "",
    skills: [] as string[],
  });
  const [newSkill, setNewSkill] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const saveToDatabase = async (updatedData: typeof formData) => {
    if (!userId) return;
    
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const handleAddSkill = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedSkill = newSkill.trim();
      
      if (trimmedSkill && !formData.skills.includes(trimmedSkill)) {
        const updatedSkills = [...formData.skills, trimmedSkill];
        const updatedData = { ...formData, skills: updatedSkills };
        
        setFormData(updatedData);
        setNewSkill('');

        try {
          await saveToDatabase(updatedData);
        } catch {
          // Rollback on error
          setFormData(formData);
          setNewSkill(trimmedSkill);
          toast({
            title: "Error",
            description: "Failed to save skill",
            variant: "destructive",
          });
        }
      }
    }
  };

  const handleRemoveSkill = async (skillToRemove: string) => {
    const updatedSkills = formData.skills.filter(skill => skill !== skillToRemove);
    const updatedData = { ...formData, skills: updatedSkills };
    
    const previousData = formData;
    
    setFormData(updatedData);

    try {
      await saveToDatabase(updatedData);
    } catch {
      // Rollback on error
      setFormData(previousData);
      toast({
        title: "Error",
        description: "Failed to remove skill",
        variant: "destructive",
      });
    }
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
        description:
          error instanceof Error ? error.message : "Failed to save changes",
        variant: "destructive",
      });
      console.error("Error saving changes:", error);
    }
  };

  const handleImageUpload = async (imageUrl: string) => {
    try {
      setIsUploading(true);

      // Only send the profile picture update
      const updateResponse = await fetch(`/api/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profilePicture: imageUrl,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update profile picture");
      }

      // Get the updated data from the server
      const updatedData = await updateResponse.json();
      
      // Update only the profile picture in the form state
      setFormData(prev => ({
        ...prev,
        profilePicture: updatedData.profilePicture || "",
      }));

      toast({
        title: "Success",
        description: "Profile picture updated successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
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
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: 'no-store', // Disable caching to always get fresh data
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch user data");
        }

        setFormData({
          name: data.name || "",
          username: data.username || "",
          tagline: data.tagline || "",
          bio: data.bio || "",
          twitter: data.twitter || "",
          github: data.github || "",
          productHunt: data.productHunt || "",
          devto: data.devto || "",
          link: data.link || "",
          location: data.location || "",
          profilePicture: data.profilePicture || "",
          skills: data.skills || [],
        });
      } catch (error) {
        console.error("Fetch error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "Failed to fetch user data",
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
          description:
            error instanceof Error ? error.message : "Failed to save changes",
          variant: "destructive",
        });
        console.error("Error saving changes:", error);
      }
    };

    if (isDirty) {
      timeoutId = setTimeout(saveChanges, 2000) as unknown as ReturnType<
        typeof setTimeout
      >;
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [formData, isDirty, userId, toast]);

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-medium font-eb-garamond">Basic Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="flex flex-col items-center space-y-4 w-full sm:w-1/4 my-2">
              <Avatar className="h-28 w-28">
                {formData.profilePicture ? (
                  <AvatarImage
                    src={formData.profilePicture}
                    alt={formData.name || "Profile"}
                  />
                ) : (
                  <AvatarFallback>
                    {isUploading ? (
                      <Loader2 className="h-8 w-8 animate-spin" />
                    ) : (
                      formData.name?.charAt(0) || "?"
                    )}
                  </AvatarFallback>
                )}
              </Avatar>
              <CldUploadButton
                onSuccess={(result: CloudinaryUploadWidgetResults) => {
                  if (
                    result &&
                    typeof result === "object" &&
                    "info" in result &&
                    result.info &&
                    typeof result.info === "object" &&
                    "secure_url" in result.info
                  ) {
                    handleImageUpload(result.info.secure_url);
                  }
                }}
                uploadPreset="portify"
                options={{ folder: "portify" }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {isUploading ? "Uploading..." : "Change Profile Picture"}
              </CldUploadButton>
            </div>

            <div className="flex-1 space-y-4 w-full sm:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <label htmlFor="username" className="text-sm font-medium flex items-center gap-2">
                          Username <span className="text-muted-foreground hover:text-foreground transition-colors">ⓘ</span>
                        </label>
                      </TooltipTrigger>
                      <TooltipContent side="top" align="start" className="translate-y-[-10px]">
                        <p>Changing your username will require a page reload</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
            </div>
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
          <div className="space-y-2">
            <label htmlFor="skills" className="text-sm font-medium">
              Skills
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.skills?.map((skill, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-destructive ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Input
              id="skills"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="Add a skill (press Enter)"
              className="mt-2"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
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
            <div className="space-y-2">
              <label htmlFor="productHunt" className="text-sm font-medium">
                Product Hunt
              </label>
              <Input
                id="productHunt"
                name="productHunt"
                value={formData.productHunt}
                onChange={handleChange}
                placeholder="Your Product Hunt username (@username)"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="devto" className="text-sm font-medium">
                Dev.to
              </label>
              <Input
                id="devto"
                name="devto"
                value={formData.devto}
                onChange={handleChange}
                placeholder="Your Dev.to username (@username)"
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

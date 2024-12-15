"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus, ImagePlus } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function AddProject() {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    link: "",
    logo: "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!userId) {
      toast({
        title: "Error",
        description: "Please sign in to add a project",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      toast({
        title: "Success",
        description: "Project added successfully",
      });
      
      // Reset form and close dialog
      setFormData({
        name: "",
        description: "",
        link: "",
        logo: "",
        category: "",
      });
      setIsDialogOpen(false);

      window.location.reload();
    } catch {
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (imageUrl: string) => {
    try {
      setIsUploading(true);
      setFormData((prev) => ({
        ...prev,
        logo: imageUrl,
      }));
      
      toast({
        title: "Success",
        description: "Logo uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast({
        title: "Error",
        description: "Failed to upload logo",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setIsDialogOpen(true)} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Project
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} modal={false}>
        {isDialogOpen && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        )}
        <DialogContent className="sm:max-w-md" onInteractOutside={(event) => event.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter project name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Project URL</label>
              <Input
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Web App, Mobile App"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium block mb-2">
                Project Logo
              </label>
              <div className="flex items-center gap-4">
                {formData.logo && (
                  <div className="flex items-center gap-2 flex-1">
                    <Image
                      src={formData.logo}
                      alt="Project logo"
                      width={50}
                      height={50}
                      className="rounded-lg"
                    />
                  </div>
                )}
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
                  className="w-1/2 flex h-10 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-2">
                    <ImagePlus className="h-4 w-4" />
                    {formData.logo ? "Set New Logo" : "Upload Logo"}
                  </div>
                </CldUploadButton>
              </div>
            </div>
            <Button onClick={handleSubmit} className="w-full">
              Add Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
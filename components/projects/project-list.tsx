"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { ImagePlus } from "lucide-react";
import ProjectCard from "./project-card";

interface Project {
  id: string;
  name: string;
  description: string | null;
  link: string | null;
  logo: string | null;
  category: string | null;
}

export default function ProjectList() {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [, setIsUploading] = useState(false);
  const [editedProject, setEditedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/projects?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userId]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setEditedProject({ ...project });
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editedProject) return;
    const { name, value } = e.target;
    setEditedProject((prev) => ({ ...prev!, [name]: value }));

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...editedProject, [name]: value, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      const updatedProject = await response.json();
      setProjects((prev) =>
        prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
      );
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleImageUpload = async (imageUrl: string) => {
    try {
      setIsUploading(true);

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...editedProject, logo: imageUrl, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      const updatedProject = await response.json();
      
      setProjects((prev) =>
        prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
      );
      setSelectedProject(updatedProject);
      setEditedProject(updatedProject);

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

  const handleRemoveLogo = async () => {
    try {
      if (editedProject) {
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...editedProject, logo: null, userId }),
        });

        if (!response.ok) {
          throw new Error("Failed to remove logo");
        }

        const updatedProject = await response.json();
        
        // Update all states immediately
        setProjects((prev) =>
          prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
        );
        setSelectedProject(updatedProject);
        setEditedProject(updatedProject);

        toast({
          title: "Success",
          description: "Logo removed successfully",
        });
      }
    } catch (error) {
      console.error("Error removing logo:", error);
      toast({
        title: "Error",
        description: "Failed to remove logo",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!userId) return;

    try {
      const response = await fetch(
        `/api/projects?id=${projectId}&userId=${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      setProjects(projects.filter((project) => project.id !== projectId));
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <Card className="bg-muted">
        <CardContent className="py-6">
          <p className="text-center text-sm text-muted-foreground">
            No projects added yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onProjectClick={handleProjectClick}
            onDeleteClick={handleDeleteProject}
          />
        ))}
      </div>

      <Dialog
        open={selectedProject !== null}
        onOpenChange={() => setSelectedProject(null)}
        modal={false}
      >
        {selectedProject !== null && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        )}
        <DialogContent
          className="sm:max-w-md"
          onInteractOutside={(event) => event.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Name</label>
                <Input
                  name="name"
                  value={selectedProject.name}
                  onChange={handleChange}
                  placeholder="Enter project name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  name="description"
                  value={selectedProject.description || ""}
                  onChange={handleChange}
                  placeholder="Describe your project"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Project URL</label>
                <Input
                  name="link"
                  value={selectedProject.link || ""}
                  onChange={handleChange}
                  placeholder="https://"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Input
                  name="category"
                  value={selectedProject.category || ""}
                  onChange={handleChange}
                  placeholder="e.g., Web App, Mobile App"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium block mb-2">
                  Project Logo
                </label>
                <div className="flex items-center gap-4">
                  {selectedProject?.logo && (
                    <div className="flex items-center gap-2 flex-1">
                      <div className="relative group">
                        <Image
                          src={selectedProject.logo}
                          alt="Project logo"
                          width={50}
                          height={50}
                          className="rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6"
                          onClick={handleRemoveLogo}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
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
                    options={{
                      maxFiles: 1,
                      folder: "portify"
                    }}
                    className="w-1/2 flex h-10 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <ImagePlus className="h-4 w-4" />
                      {editedProject?.logo ? "Set New Logo" : "Upload Logo"}
                    </div>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

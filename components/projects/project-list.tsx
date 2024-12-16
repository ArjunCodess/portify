"use client";

import React, { useEffect, useState, useCallback } from "react";
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
import SortableProjectCard from "./sortable-project-card";
import { ProjectWithSerialNumber } from "@/types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function ProjectList() {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<ProjectWithSerialNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithSerialNumber | null>(null);
  const [, setIsUploading] = useState(false);
  const [editedProject, setEditedProject] =
    useState<ProjectWithSerialNumber | null>(null);

  const fetchProjects = useCallback(async () => {
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
  }, [userId]);

  useEffect(() => {
    fetchProjects();
  }, [userId, fetchProjects]);

  const handleProjectClick = (project: ProjectWithSerialNumber) => {
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

  const handleBannerUpload = async (result: CloudinaryUploadWidgetResults) => {
    try {
      setIsUploading(true);
      if (
        result.info &&
        typeof result.info === "object" &&
        "secure_url" in result.info
      ) {
        const imageUrl = result.info.secure_url as string;

        const response = await fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...editedProject, banner: imageUrl, userId }),
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
          description: "Banner uploaded successfully",
        });
      }
    } catch (error) {
      console.error("Error uploading banner:", error);
      toast({
        title: "Error",
        description: "Failed to upload banner",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveBanner = async () => {
    try {
      if (editedProject) {
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...editedProject, banner: null, userId }),
        });

        if (!response.ok) {
          throw new Error("Failed to remove banner");
        }

        const updatedProject = await response.json();

        setProjects((prev) =>
          prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
        );
        setSelectedProject(updatedProject);
        setEditedProject(updatedProject);

        toast({
          title: "Success",
          description: "Banner removed successfully",
        });
      }
    } catch (error) {
      console.error("Error removing banner:", error);
      toast({
        title: "Error",
        description: "Failed to remove banner",
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

  const updateProjectOrder = async (projectIds: string[]) => {
    const response = await fetch("/api/projects/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectIds }),
    });

    if (!response.ok) {
      throw new Error("Failed to update project order");
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setProjects((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        // Make API call in background without waiting
        updateProjectOrder(newItems.map((item) => item.id)).catch(() => {
          toast({
            title: "Error updating project order",
            description:
              "Failed to save the new project order. Please try again.",
            variant: "destructive",
          });
          // Fetch the latest order from the server
          fetchProjects();
        });

        return newItems;
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={projects.map((p) => p.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="grid gap-4 md:grid-cols-2 auto-rows-max">
            {projects.map((project) => (
              <SortableProjectCard
                key={project.id}
                project={{
                  ...project,
                  serialNumber: projects.indexOf(project) + 1,
                }}
                onClick={() => handleProjectClick(project)}
                onDelete={() => handleDeleteProject(project.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

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
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="relative col-span-1">
                    <CldUploadButton
                      uploadPreset="portify"
                      options={{ folder: "portify" }}
                      className={`h-32 w-full border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-primary/50 transition group ${
                        selectedProject?.logo
                          ? "border-primary"
                          : "border-muted-foreground"
                      }`}
                      onSuccess={(result: CloudinaryUploadWidgetResults) => {
                        if (
                          result.info &&
                          typeof result.info === "object" &&
                          "secure_url" in result.info
                        ) {
                          handleImageUpload(result.info.secure_url);
                        }
                      }}
                    >
                      {selectedProject?.logo ? (
                        <>
                          <Image
                            src={selectedProject.logo}
                            alt="Project logo"
                            width={128}
                            height={128}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <div className="flex flex-col items-center gap-2">
                              <ImagePlus className="w-6 h-6 text-foreground" />
                              <span className="text-sm font-medium">
                                Change Logo
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <ImagePlus className="w-6 h-6 text-muted-foreground" />
                          <span className="text-sm font-medium text-muted-foreground">
                            Upload Logo
                          </span>
                        </div>
                      )}
                    </CldUploadButton>
                    {selectedProject?.logo && (
                      <div className="absolute -top-2 -right-2">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={handleRemoveLogo}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="col-span-2 relative">
                    <CldUploadButton
                      uploadPreset="portify"
                      options={{ folder: "portify" }}
                      className={`relative h-32 w-full border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-primary/50 transition group ${
                        selectedProject?.banner
                          ? "border-primary"
                          : "border-muted-foreground"
                      }`}
                      onSuccess={handleBannerUpload}
                    >
                      {selectedProject?.banner ? (
                        <>
                          <Image
                            src={selectedProject.banner}
                            alt="Project banner"
                            width={256}
                            height={128}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <div className="flex flex-col items-center gap-2">
                              <ImagePlus className="w-6 h-6 text-foreground" />
                              <span className="text-sm font-medium">
                                Change Banner
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <ImagePlus className="w-6 h-6 text-muted-foreground" />
                          <span className="text-sm font-medium text-muted-foreground">
                            Upload Banner
                          </span>
                        </div>
                      )}
                    </CldUploadButton>
                    {selectedProject?.banner && (
                      <div className="absolute top-2 right-2 z-10">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={handleRemoveBanner}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  Recommended: Square logo (128x128px), Wide banner (1200x400px)
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

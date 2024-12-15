"use client";

import { Card, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Project } from "@/types";
import { GripVertical } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onProjectClick: (project: Project) => void;
  onDeleteClick: (projectId: string) => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

export default function ProjectCard({
  project,
  onProjectClick,
  onDeleteClick,
  dragHandleProps
}: ProjectCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDeleteClick(project.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Card
        className="overflow-hidden hover:bg-accent transition-colors relative flex"
        onClick={() => onProjectClick(project)}
      >
        {dragHandleProps && (
          <div
            className="w-10 cursor-grab active:cursor-grabbing hover:bg-muted flex items-center justify-center border-r"
            {...dragHandleProps}
          >
            <GripVertical className="h-4 w-4" />
          </div>
        )}
        <div className="flex-1">
          <CardHeader className="space-y-4 relative">
            <div className="flex items-center gap-4">
              {project.logo ? (
                <div className="relative">
                  <span className="absolute -top-3 -left-3 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                    {project.serialNumber}
                  </span>
                  <Image
                    src={project.logo}
                    alt={project.name}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </div>
              ) : (
                <div className="relative">
                  <span className="absolute -top-3 -left-3 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                    {project.serialNumber}
                  </span>
                  <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                    <span className="text-xl font-medium text-muted-foreground">
                      {project.name[0]}
                    </span>
                  </div>
                </div>
              )}
              <CardTitle className="flex items-center justify-between w-full">
                {project.name}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive-foreground bg-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteDialog(true);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardTitle>
            </div>
            {project.category && (
              <p className="text-sm text-muted-foreground">{project.category}</p>
            )}
            {project.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            )}
          </CardHeader>
        </div>
      </Card>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{project.name}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
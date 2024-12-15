import React from "react";
import AddProject from "./projects/add-project";
import ProjectList from "./projects/project-list";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function Projects() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <ProjectList />
        <AddProject />
      </CardContent>
    </Card>
  );
}
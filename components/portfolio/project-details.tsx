import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Link as LucideLink } from "lucide-react";
import Image from "next/image";
import { useProfile } from "@/app/(root)/[username]/provider";
import { Badge } from "@/components/ui/badge";
import { ProjectLink } from "@/components/projects/project-clicks";

export default function ProjectDetails() {
  const { userData } = useProfile();

  if (!userData?.projects?.length) return null;

  const sortedProjects = [...userData.projects].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  return (
    <>
      {userData.template === "minimal" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Projects</h2>
            <p className="text-sm text-muted-foreground">
              Here are some of my best works:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {sortedProjects.map((project, index) => (
              <Card
                key={index}
                className="group overflow-hidden border bg-background/40 hover:bg-background/60 transition-colors"
              >
                {project.banner && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={project.banner}
                      alt={`${project.name} banner`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-start gap-4">
                    {project.logo && (
                      <div className="relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border bg-background">
                        <Image
                          src={project.logo}
                          alt={`${project.name} logo`}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                          <CardTitle className="text-base font-medium">
                            {project.name}
                          </CardTitle>
                          <CardDescription className="text-sm text-foreground/70">
                            {project.description}
                          </CardDescription>
                          {project.category && project.category.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                              {project.category.split(",").map((item, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {item.trim()}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 text-foreground/50 flex-shrink-0">
                          {project.github && (
                            <ProjectLink
                              href={project.github}
                              projectId={project.id}
                            >
                              <Github className="h-5 w-5 hover:text-foreground transition-colors" />
                            </ProjectLink>
                          )}
                          {project.link && (
                            <ProjectLink
                              href={project.link}
                              projectId={project.id}
                            >
                              <LucideLink className="h-5 w-5 hover:text-foreground transition-colors" />
                            </ProjectLink>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      )}

      {userData.template === "pristine" && (
        <div className="space-y-6 bg-background/95 dark:bg-background/5 p-4 pt-6 sm:p-6 rounded-lg backdrop-blur-sm border border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl text-foreground font-bold">Projects</h2>
          </div>
          <div className="grid gap-4">
            {sortedProjects.map((project, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-lg border border-border bg-card hover:bg-card/80 dark:bg-background/10 dark:hover:bg-background/20 transition-colors"
              >
                {project.banner && (
                  <div className="relative w-full h-36 sm:h-48">
                    <Image
                      src={project.banner}
                      alt={`${project.name} banner`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 2}
                    />
                  </div>
                )}
                <div className="flex flex-col items-start gap-4 p-4">
                  <div className="flex items-start gap-4 w-full">
                    {project.logo && (
                      <div className="relative flex-shrink-0 w-14 h-14 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-border">
                        <Image
                          src={project.logo}
                          alt={`${project.name} logo`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 56px, 48px"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-medium text-lg text-foreground">{project.name}</h3>
                        <div className="flex gap-3 text-foreground/60 hover:text-foreground/80">
                          {project.github && (
                            <ProjectLink
                              href={project.github}
                              projectId={project.id}
                            >
                              <Github className="h-5 w-5 hover:text-foreground transition-colors" />
                            </ProjectLink>
                          )}
                          {project.link && (
                            <ProjectLink
                              href={project.link}
                              projectId={project.id}
                            >
                              <LucideLink className="h-5 w-5 hover:text-foreground transition-colors" />
                            </ProjectLink>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                      {project.category && project.category.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.category.split(",").map((item, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-xs bg-muted hover:bg-muted/80 dark:bg-background/20 text-foreground/70 border border-border"
                            >
                              {item.trim()}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Link as LucideLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useProfile } from "@/app/(root)/[username]/provider";
import { Badge } from "@/components/ui/badge";

export default function ProjectDetails() {
  const { userData } = useProfile();

  if (!userData?.projects?.length) return null;

  const sortedProjects = [...userData.projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Projects</h2>
        <p className="text-sm text-muted-foreground">Here are some of my best works:</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {sortedProjects.map((project, index) => (
          <Card key={index} className="group overflow-hidden border bg-background/40 hover:bg-background/60 transition-colors">
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
                    <div className="space-y-1">
                      <CardTitle className="text-base font-medium">
                        {project.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-foreground/70">
                        {project.description}
                      </CardDescription>
                      {project.category && project.category.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {project.category.split(',').map((item, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {item.trim()}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 text-foreground/50 flex-shrink-0">
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-foreground transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </Link>
                      )}
                      {project.link && (
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-foreground transition-colors"
                        >
                          <LucideLink className="h-5 w-5" />
                        </Link>
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
  );
}

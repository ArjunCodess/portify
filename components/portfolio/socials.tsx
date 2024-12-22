import { Github, Mail, Twitter, Link as LinkSVG, Globe } from "lucide-react";
import Link from "next/link";
import { UserData } from "@/types";
import { Button } from "@/components/ui/button";

export default function Socials({ data }: { data: UserData }) {
  const getGithubUrl = (url: string) => {
    if (url.startsWith("https://github.com/")) return url;
    return `https://github.com/${url.replace("@", "")}`;
  };

  const getTwitterUrl = (url: string) => {
    if (url.startsWith("https://twitter.com/")) return url;
    return `https://twitter.com/${url.replace("@", "")}`;
  };

  return (
    <>
      {data.template === "minimal" && (
        <div className="w-full max-w-sm mx-auto rounded-lg">
          <ul className="flex justify-center gap-4">
            {data.github && (
              <li>
                <Link
                  href={getGithubUrl(data.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
              </li>
            )}
            {data.twitter && (
              <li>
                <Link
                  href={getTwitterUrl(data.twitter)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </li>
            )}
            {data.link && (
              <li>
                <Link
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <LinkSVG className="h-5 w-5" />
                </Link>
              </li>
            )}
            {data.email && (
              <li>
                <Link
                  href={`mailto:${data.email}`}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}

      {data.template === "pristine" && (
        <div className="w-full max-w-sm mx-auto rounded-lg">
          <ul className="flex justify-center gap-4">
            {data.github && (
              <li>
                <Link
                  href={getGithubUrl(data.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border hover:bg-muted transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
              </li>
            )}
            {data.twitter && (
              <li>
                <Link
                  href={getTwitterUrl(data.twitter)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border hover:bg-muted transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </li>
            )}
            {data.link && (
              <li>
                <Link
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border hover:bg-muted transition-colors"
                >
                  <LinkSVG className="h-5 w-5" />
                </Link>
              </li>
            )}
            {data.email && (
              <li>
                <Link
                  href={`mailto:${data.email}`}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border hover:bg-muted transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}

      {data.template === "vibrant" && (
        <div className="w-full max-w-sm mx-auto">
          <div className="flex gap-4 justify-center">
            {data.github && (
              <Button
                asChild
                size="icon"
                variant="outline"
                className="rounded-full w-12 h-12 bg-background/50 dark:bg-background/5"
              >
                <Link href={getGithubUrl(data.github)} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {data.twitter && (
              <Button
                asChild
                size="icon"
                variant="outline"
                className="rounded-full w-12 h-12 bg-background/50 dark:bg-background/5"
              >
                <Link href={getTwitterUrl(data.twitter)} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {data.link && (
              <Button
                asChild
                size="icon"
                variant="outline"
                className="rounded-full w-12 h-12 bg-background/50 dark:bg-background/5"
              >
                <Link href={data.link} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {data.email && (
              <Button
                asChild
                size="icon"
                variant="outline"
                className="rounded-full w-12 h-12 bg-background/50 dark:bg-background/5"
              >
                <Link href={`mailto:${data.email}`}>
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

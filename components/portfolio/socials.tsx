import {
  Github,
  Mail,
  Twitter,
  Link as LinkSVG,
  Globe,
  Link2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserData } from "@/types";
import BlurFade from "../ui/blur-fade";

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
    <BlurFade delay={0.7}>
      {data.template === "minimal" && (
        <div className="w-full max-w-xs sm:max-w-sm mx-auto rounded-lg">
          <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {data.github && (
              <li>
                <Link
                  href={getGithubUrl(data.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-background border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
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
                  className="flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-background border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
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
                  className="flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-background border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <LinkSVG className="h-5 w-5" />
                </Link>
              </li>
            )}
            {data.email && (
              <li>
                <Link
                  href={`mailto:${data.email}`}
                  className="flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-background border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}

      {data.template === "pristine" && (
        <div className="w-full max-w-xs sm:max-w-sm mx-auto rounded-lg">
          <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {data.github && (
              <li>
                <Link
                  href={getGithubUrl(data.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-background border border-border hover:bg-muted transition-colors"
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
                  className="flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-background border border-border hover:bg-muted transition-colors"
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
                  className="flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-background border border-border hover:bg-muted transition-colors"
                >
                  <LinkSVG className="h-5 w-5" />
                </Link>
              </li>
            )}
            {data.email && (
              <li>
                <Link
                  href={`mailto:${data.email}`}
                  className="flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-background border border-border hover:bg-muted transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}

      {data.template === "vibrant" && (
        <div className="w-full max-w-xs sm:max-w-sm mx-auto">
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            {data.github && (
              <Button
                asChild
                size="icon"
                variant="outline"
                className="rounded-full w-11 h-11 sm:w-12 sm:h-12 bg-background/50 dark:bg-background/5"
              >
                <Link
                  href={getGithubUrl(data.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {data.twitter && (
              <Button
                asChild
                size="icon"
                variant="outline"
                className="rounded-full w-11 h-11 sm:w-12 sm:h-12 bg-background/50 dark:bg-background/5"
              >
                <Link
                  href={getTwitterUrl(data.twitter)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {data.link && (
              <Button
                asChild
                size="icon"
                variant="outline"
                className="rounded-full w-11 h-11 sm:w-12 sm:h-12 bg-background/50 dark:bg-background/5"
              >
                <Link
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {data.email && (
              <Button
                asChild
                size="icon"
                variant="outline"
                className="rounded-full w-11 h-11 sm:w-12 sm:h-12 bg-background/50 dark:bg-background/5"
              >
                <Link href={`mailto:${data.email}`}>
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}

      {data.template === "elegant" && (
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
            {data.link && (
              <Link
                href={data.link!}
                className="rounded-full bg-background p-2 sm:p-2.5 hover:bg-background/90 border"
              >
                <Link2 className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
              </Link>
            )}
            {data.twitter && (
              <Link
                href={data.twitter!}
                className="rounded-full bg-background p-2 sm:p-2.5 hover:bg-background/90 border"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
              </Link>
            )}
            {data.github && (
              <Link
                href={data.github!}
                className="rounded-full bg-background p-2 sm:p-2.5 hover:bg-background/90 border"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
              </Link>
            )}
            {data.email && (
              <Link
                href={`mailto:${data.email}`}
                className="rounded-full bg-background p-2 sm:p-2.5 hover:bg-background/90 border"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
              </Link>
            )}
          </div>
        </div>
      )}
    </BlurFade>
  );
}

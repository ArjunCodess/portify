import { Github, Mail, Twitter, Link as LinkSVG } from "lucide-react";
import Link from "next/link";
import { UserData } from "@/types";

export default function Socials({ data }: { data: UserData }) {
  return (
    <>
      {data.template === "minimal" && (
        <div className="w-full max-w-sm mx-auto rounded-lg">
          <ul className="flex justify-center gap-4">
            {data.github && (
              <li>
                <Link
                  href={data.github}
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
                  href={data.twitter}
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
        <div className="w-full rounded-lg bg-background/90 dark:bg-background/5 px-4 py-5 sm:py-6 backdrop-blur-sm border border-border">
          <div className="flex flex-wrap justify-center gap-3">
            {data.github && (
              <Link
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-lg border border-border bg-background/50 dark:bg-background/10 hover:bg-background/70 dark:hover:bg-background/20 text-foreground/80 hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
            )}
            {data.twitter && (
              <Link
                href={data.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-lg border border-border bg-background/50 dark:bg-background/10 hover:bg-background/70 dark:hover:bg-background/20 text-foreground/80 hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            )}
            {data.link && (
              <Link
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-lg border border-border bg-background/50 dark:bg-background/10 hover:bg-background/70 dark:hover:bg-background/20 text-foreground/80 hover:text-foreground transition-colors"
              >
                <LinkSVG className="h-5 w-5" />
              </Link>
            )}
            {data.email && (
              <Link
                href={`mailto:${data.email}`}
                className="flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-lg border border-border bg-background/50 dark:bg-background/10 hover:bg-background/70 dark:hover:bg-background/20 text-foreground/80 hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

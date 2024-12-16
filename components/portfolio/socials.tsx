import React from "react";
import Link from "next/link";
import { Github, Link as LinkSVG, Twitter, Mail } from "lucide-react";
import { UserData } from "@/types";

export default function Socials({ data }: { data: UserData }) {
  return (
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
  );
}

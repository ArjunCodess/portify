"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { RotateCw, ExternalLink } from "lucide-react";

interface PreviewProps {
  username: string;
}

export default function Preview({ username }: PreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setError("Username not available");
      setIsLoading(false);
      return;
    }

    try {
      const url = `${window.location.origin}/${username}`;
      setPreviewUrl(url);
    } catch {
      setError("Failed to generate preview URL");
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  const containerClasses =
    "sticky top-24 flex justify-center items-center w-full min-w-[320px] max-w-[25rem] min-h-[667px] aspect-[9/19] rounded-2xl overflow-hidden shadow-2xl dark:shadow-neutral-950 border dark:border-neutral-800 mx-auto mb-4 border";

  if (isLoading) {
    return <div className={containerClasses}><Skeleton className="w-full h-full" /></div>;
  }

  if (error) {
    return (
      <div className={containerClasses}>
        <div className="text-sm text-muted-foreground">{error}</div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div className="relative w-full h-full">
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-4 right-16 z-10 bg-muted border rounded-2xl"
          onClick={() => {
            const iframe = document.querySelector('iframe');
            if (iframe) {
              iframe.src = iframe.src;
            }
          }}
        >
          <RotateCw className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-4 right-4 z-10 bg-muted border rounded-2xl"
          onClick={() => window.open(previewUrl, '_blank')}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
        <iframe 
          src={previewUrl}
          className="w-full h-full"
          title={`Preview for ${username}`}
          loading="lazy"
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </div>
  );
}
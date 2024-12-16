"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

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
    "sticky top-24 flex justify-center items-center w-full min-w-[320px] max-w-[25rem] min-h-[667px] aspect-[9/19] rounded-2xl overflow-hidden shadow-2xl dark:shadow-neutral-950 border dark:border-neutral-800 mx-auto mb-4";

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
      <iframe 
        src={previewUrl}
        className="w-full h-full"
        title={`Preview for ${username}`}
        loading="lazy"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
}
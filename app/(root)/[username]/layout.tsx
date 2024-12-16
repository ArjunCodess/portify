"use client";

import Provider from "./provider";
import React from "react";

export default function UsernameLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}) {
  const resolvedParams = React.use(params);
  return (
    <div className="h-full w-full">
      <Provider username={resolvedParams.username}>{children}</Provider>
    </div>
  );
}
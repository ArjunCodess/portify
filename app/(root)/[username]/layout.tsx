import { Metadata } from "next";
import Provider from "./provider";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}

export async function generateMetadata(
  { params }: LayoutProps
): Promise<Metadata> {
  const resolvedParams = await params;
  const username = resolvedParams.username;

  return {
    title: `${username}'s Portfolio | Portify`,
    description: `View ${username}'s professional portfolio on Portify`,
    openGraph: {
      title: `${username}'s Portfolio | Portify`,
      description: `Check out ${username}'s professional portfolio`,
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${username}'s Portfolio | Portify`,
      description: `Check out ${username}'s professional portfolio`,
    },
    alternates: {
      canonical: `/${username}`,
    },
  }
}

export default function UsernameLayout({
  children,
  params,
}: LayoutProps) {
  const resolvedParams = React.use(params);
  
  return (
    <Provider username={resolvedParams.username}>
      {children}
    </Provider>
  );
}
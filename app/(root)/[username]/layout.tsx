import { Metadata } from "next";
import Provider from "./provider";
import React from "react";

type Props = {
  params: { username: string }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const username = params.username

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
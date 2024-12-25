import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Create Your Portfolio | Portify',
  description: 'Set up your professional portfolio in minutes with Portify. Choose your template, customize your theme, and start showcasing your work.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Create Your Portfolio | Portify',
    description: 'Set up your professional portfolio in minutes with Portify',
    type: 'website',
    url: 'https://portify.vercel.app/create',
    siteName: 'Portify',
  },
  alternates: {
    canonical: '/create',
  },
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
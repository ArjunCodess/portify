import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavbarContainer from "@/components/navbar-container";
import { Toaster } from "@/components/ui/toaster";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Portify - Build Your Professional Portfolio w/ Ease',
  authors: [
    {
      name: "Arjun",
      url: "https://github.com/arjuncodess",
    },
  ],
  creator: "Arjun",
  description: 'Create and showcase your professional portfolio with Portify. Easy to use, beautiful templates, and powerful customization options.',
  openGraph: {
    title: 'Portify - Build Your Professional Portfolio with Ease',
    description: 'Create and showcase your professional portfolio with Portify. Easy to use, beautiful templates, and powerful customization options.',
    type: 'website',
    url: 'https://getportify.vercel.app',
    siteName: 'Portify',
    images: [
      {
        url: 'https://getportify.vercel.app/og.png',
        width: 1200,
        height: 630,
        alt: 'Portify - Build Your Professional Portfolio with Ease',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portify - Build Your Professional Portfolio with Ease',
    description: 'Create and showcase your professional portfolio with Portify',
    site: '@portify',
    creator: '@arjuncodess',
    images: ['https://getportify.vercel.app/og.png'],
  },
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
  },
  keywords: [
    'portfolio', 'professional', 'showcase', 'projects', 'skills', 
    'resume', 'cv', 'career', 'design', 'creativity', 
    'builder', 'creator', 'development', 'presentation', 'expertise', 
    'work', 'experience', 'achievements', 'personal', 'branding', 
    'online', 'profile', 'job', 'freelance', 'employment', 
    'talent', 'growth', 'success', 'visual', 'web', 
    'digital', 'templates', 'customization', 'modern', 'sleek', 
    'interface', 'user-friendly', 'navigation', 'portfolio-builder', 'portfolio-design', 
    'content', 'media', 'portfolio-platform', 'portfolio-website', 'responsive', 
    'layout', 'portfolio-showcase', 'portfolio-generator', 'skills-display', 'project-highlights'
  ],  
  category: 'Portfolio Builder',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geist.className} antialiased`}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavbarContainer />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
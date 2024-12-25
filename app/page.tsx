import Image from "next/image";
import { Metadata } from 'next';

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
  viewport: 'width=device-width, initial-scale=1',
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

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 pt-10 px-4 md:px-6 bg-background border-t">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-8 md:mb-0">
            <Link href="/">
              <p className="flex items-center gap-4 rounded-lg text-2xl font-bold">
                <Image src="/logo.svg" height={25} width={25} alt="Portify Logo" />
                Portify
              </p>
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
              Showcase your portfolio with style.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Admin</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/admin" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/admin/styles" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                    Styles
                  </Link>
                </li>
                <li>
                  <Link href="/admin/analytics" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/create" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                    Create
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Socials</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://x.com/arjuncodess" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                    X
                  </a>
                </li>
                <li>
                  <a href="https://github.com/arjuncodess/portify" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <h1 className="font-eb-garamond text-center md:text-left text-[5rem] md:text-[8rem] lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-900">
          portify.
        </h1>
      </div>
    </footer>
  );
}
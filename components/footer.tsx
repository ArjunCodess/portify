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
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/showcase" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                    Showcase
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                    Guides
                  </Link>
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
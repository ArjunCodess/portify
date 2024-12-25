import { SignIn } from "@clerk/nextjs";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | Portify',
  description: 'Sign in to your Portify account to manage your portfolio',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/sign-in',
  },
};

export default function Page() {
  return (
    <section className="flex justify-center items-center min-h-[calc(100vh-65px)]">
      <SignIn />
    </section>
  );
}

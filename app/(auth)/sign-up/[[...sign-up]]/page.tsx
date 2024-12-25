import { SignUp } from "@clerk/nextjs";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account | Portify',
  description: 'Join Portify to create and showcase your professional portfolio',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/sign-up',
  },
};

export default function Page() {
  return (
    <section className="flex justify-center items-center min-h-[calc(100vh-65px)]">
      <SignUp />
    </section>
  );
}
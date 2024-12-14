import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex justify-center items-center min-h-[calc(100vh-65px)]">
      <SignIn />
    </section>
  );
}

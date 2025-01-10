import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <div className="w-full px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col text-center bg-muted/50 rounded-md p-6 sm:p-8 lg:p-14 gap-6 sm:gap-8 items-center">
          <div className="flex flex-col gap-2 sm:gap-4">
            <h3 className="font-medium font-eb-garamond text-3xl sm:text-4xl md:text-6xl tracking-tighter max-w-2xl font-regular">
              Build Your Portfolio <span className="underline underline-offset-8 decoration-blue-500">Now!</span>
            </h3>
            <p className="text-base sm:text-lg leading-relaxed tracking-tight text-muted-foreground max-w-2xl mx-auto">
              Showcase your skills and projects with ease. Our portfolio builder
              app helps you create a professional, eye-catching portfolio in
              minutes. Stand out from the crowd and make a lasting impression on
              potential employers or clients.
            </p>
          </div>
          <Link href="/create">
            <Button className="gap-2 sm:gap-4 w-full md:w-auto min-w-[200px]">
              Get Started <MoveRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
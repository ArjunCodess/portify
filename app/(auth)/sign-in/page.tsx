"use client";

import { signIn, AuthResult } from "@/actions/auth";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result: AuthResult = await signIn(formData);
      if (!result.success && result.error) {
        setError(result.error);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await authClient.signIn.social({
        provider: "google",
      });
      // No need to handle success case - user will be redirected by the provider
    } catch {
      setError("Failed to initiate Google sign in. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col items-center justify-center p-4 py-6 sm:py-12">
      <div className="w-full max-w-[340px] sm:max-w-md space-y-6 sm:space-y-8 rounded-lg border border-neutral-200 bg-card p-4 sm:p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold">Sign In</h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-600">
            Sign in to access your ChemistryCheck account
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 sm:p-4">
            <div className="flex">
              <div className="text-xs sm:text-sm text-red-700">{error}</div>
            </div>
          </div>
        )}

        <form
          action={handleSubmit}
          className="mt-4 sm:mt-8 space-y-4 sm:space-y-6"
        >
          <div className="space-y-3 sm:space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm sm:text-base">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 text-sm sm:text-base"
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm sm:text-base">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 text-sm sm:text-base"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full text-sm sm:text-base py-2 h-auto sm:h-10"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>

        <div className="relative my-3 sm:my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-xs sm:text-sm text-neutral-500">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full text-sm sm:text-base py-2 h-auto sm:h-10"
          disabled={isLoading}
          onClick={handleGoogleSignIn}
        >
          <svg
            className="mr-2 h-3 w-3 sm:h-4 sm:w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Sign in with Google
        </Button>

        <div className="text-center">
          <p className="text-xs sm:text-sm text-neutral-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

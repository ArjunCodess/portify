"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Headers } from "next/dist/compiled/@edge-runtime/primitives/fetch";

export type AuthResult = {
  success: boolean;
  error?: string;
};

// Note: We're relying on the nextCookies plugin configured in lib/auth.ts to handle cookies automatically, so explicit headers handling is not needed

export async function signIn(formData: FormData): Promise<AuthResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    redirect("/profile");
    return { success: true };
  } catch (error) {
    console.error("Sign in error:", error);
    return { 
      success: false, 
      error: "Failed to sign in. Please check your credentials." 
    };
  }
}

export async function signUp(formData: FormData): Promise<AuthResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    redirect("/profile");
    // This return is only reached if redirect fails
    return { success: true };
  } catch (error) {
    console.error("Sign up error:", error);
    return { 
      success: false, 
      error: "Failed to sign up. Please try again." 
    };
  }
}

// For server-side sign-out
export async function signOut(): Promise<AuthResult> {
  try {
    // Use an empty object and accept the type error for now
    // This works with the nextCookies plugin
    await auth.api.signOut({
      // Force the headers to be empty object but satisfy the type system
      headers: {} as HeadersInit,
    });
    
    redirect("/");
    // This return is only reached if redirect fails
    return { success: true };
  } catch (error) {
    console.error("Sign out error:", error);
    return { 
      success: false, 
      error: "Failed to sign out. Please try again." 
    };
  }
}

// For server-side session check
export async function getSession() {
  try {
    // Use an empty object and accept the type error for now
    // This works with the nextCookies plugin
    const session = await auth.api.getSession({
      // Force the headers to be empty but satisfy the type system
      headers: new Headers(),
    });
    
    return session;
  } catch (error) {
    console.error("Get session error:", error);
    return null;
  }
}
"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createUsername, checkUsernameAvailable } from "@/actions/username";
import { getUserByEmail } from "@/actions/user";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { templates } from "@/lib/templates";
import { themes } from "@/lib/themes";
import { headingFonts, contentFonts } from "@/lib/fonts";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [template, setTemplate] = useState("minimal");
  const [theme, setTheme] = useState("neutral");
  const [headingFont, setHeadingFont] = useState("geist");
  const [contentFont, setContentFont] = useState("geist");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [, setIsChecking] = useState(false);

  useEffect(() => {
    async function checkUser() {
      if (!user?.id) return;

      if (!user.primaryEmailAddress?.emailAddress) return;

      const userRecord = await getUserByEmail(
        user.primaryEmailAddress.emailAddress
      );
      if (userRecord) {
        router.push("/admin");
      }
    }

    checkUser();
  }, [user, router]);

  useEffect(() => {
    const checkUsername = async () => {
      if (!username) {
        setError("");
        return;
      }

      // Basic validation
      if (username.length < 5) {
        setError("Username must be at least 5 characters long");
        return;
      }

      if (username.includes(" ")) {
        setError("Username cannot contain spaces");
        return;
      }

      if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        setError(
          "Username can only contain letters, numbers, underscores, and hyphens"
        );
        return;
      }

      setIsChecking(true);
      try {
        const isAvailable = await checkUsernameAvailable(username);
        if (!isAvailable) {
          setError("This username is already taken");
        } else {
          setError("");
        }
      } catch {
        setError("Error checking username availability");
      } finally {
        setIsChecking(false);
      }
    };

    const debounceTimer = setTimeout(checkUsername, 500);
    return () => clearTimeout(debounceTimer);
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.primaryEmailAddress?.emailAddress || !user.fullName) return;
    if (error) return;

    setIsLoading(true);
    try {
      const result = await createUsername(
        user.primaryEmailAddress.emailAddress,
        username,
        user.fullName,
        user.id,
        template,
        theme,
        headingFont,
        contentFont
      );

      if (result.success) {
        toast({
          title: "Success!",
          description: "Your portfolio is ready",
        });
        router.push("/admin");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Something went wrong",
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create portfolio",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-65px)]">
      <div className="container max-w-2xl py-10">
        <Card>
          <CardHeader>
            <CardTitle>Create your portfolio</CardTitle>
            <CardDescription>
              Choose a username and customize your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={error ? "border-red-500" : ""}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Font Selection</Label>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Heading Font</h3>
                    <RadioGroup
                      value={headingFont}
                      onValueChange={setHeadingFont}
                      className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                    >
                      {headingFonts.map((font) => (
                        <div key={font.value}>
                          <RadioGroupItem
                            value={font.value}
                            id={`heading-${font.value}`}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={`heading-${font.value}`}
                            className={`cursor-pointer flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary font-${font.value}`}
                          >
                            <span>{font.label}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Content Font</h3>
                    <RadioGroup
                      value={contentFont}
                      onValueChange={setContentFont}
                      className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                    >
                      {contentFonts.map((font) => (
                        <div key={font.value}>
                          <RadioGroupItem
                            value={font.value}
                            id={`content-${font.value}`}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={`content-${font.value}`}
                            className={`cursor-pointer flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary font-${font.value}`}
                          >
                            <span>{font.label}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Template</Label>
                <RadioGroup
                  value={template}
                  onValueChange={setTemplate}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {templates.map((template) => (
                    <div key={template.value}>
                      <RadioGroupItem
                        value={template.value}
                        id={template.value}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={template.value}
                        className="cursor-pointer flex flex-col rounded-md border-2 border-muted bg-background hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary overflow-hidden"
                      >
                        <div className="relative w-full aspect-[16/10] border-b-2 border-muted">
                          <Image
                            src={template.image}
                            alt={template.label}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <span className="font-medium">{template.label}</span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Theme</Label>
                <RadioGroup
                  value={theme}
                  onValueChange={setTheme}
                  className="grid grid-cols-2 gap-4"
                >
                  {themes.map((theme) => (
                    <div key={theme.name}>
                      <RadioGroupItem
                        value={theme.name}
                        id={theme.name}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={theme.name}
                        className="cursor-pointer flex flex-row items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span>{theme.label}</span>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-4 w-4 rounded-full border"
                            style={{ backgroundColor: `#${theme.activeColor}` }}
                          />
                          <div
                            className="h-4 w-4 rounded-full border"
                            style={{
                              backgroundColor: `hsl(${theme.cssVars.light["--primary"]})`,
                            }}
                          />
                          <div
                            className="h-4 w-4 rounded-full border"
                            style={{
                              backgroundColor: `hsl(${theme.cssVars.light["--accent"]})`,
                            }}
                          />
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Separator />

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !!error}
              >
                {isLoading ? "Creating..." : "Create Portfolio"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

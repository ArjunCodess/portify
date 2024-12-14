'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createUsername, checkUsernameAvailable } from '@/actions/username';
import { getUserByEmail } from '@/actions/user';
import { useToast } from '@/hooks/use-toast';

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    async function checkUser() {
      if (!user?.id) return;
      
      if (!user.primaryEmailAddress?.emailAddress) return;
      
      const userRecord = await getUserByEmail(user.primaryEmailAddress.emailAddress);
      if (userRecord) {
        router.push("/admin");
      }
    }
    
    checkUser();
  }, [user, router]);

  useEffect(() => {
    const checkUsername = async () => {
      if (!username) {
        setError('');
        return;
      }

      // Basic validation
      if (username.length < 5) {
        setError('Username must be at least 5 characters long');
        return;
      }

      if (username.includes(' ')) {
        setError('Username cannot contain spaces');
        return;
      }

      if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        setError('Username can only contain letters, numbers, underscores, and hyphens');
        return;
      }

      setIsChecking(true);
      try {
        const isAvailable = await checkUsernameAvailable(username);
        if (!isAvailable) {
          setError('This username is already taken');
        } else {
          setError('');
        }
      } catch {
        setError('Error checking username availability');
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
        user.fullName
      );

      if (result.success) {
        toast({
          title: "Success!",
          description: "Your portfolio is ready",
        });
        router.push('/admin');
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-lg mx-auto min-h-[calc(100vh-65px)] flex justify-center items-center py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create Username for Portfolio</CardTitle>
          <CardDescription>Add Username for your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Enter username"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                disabled={isLoading}
                className={error ? "border-red-500" : ""}
              />
              {isChecking ? (
                <p className="text-sm text-muted-foreground">Checking username...</p>
              ) : error ? (
                <p className="text-sm text-red-500">{error}</p>
              ) : username.length > 0 ? (
                <p className="text-sm text-green-500">Username is available!</p>
              ) : null}
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !username.trim() || Boolean(error)}
            >
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
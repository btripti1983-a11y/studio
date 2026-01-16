"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up Disabled</CardTitle>
          <CardDescription>
            User registration is currently not available.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p>Access is restricted. Please use the access code provided to you to log in.</p>
        </CardContent>
        <CardFooter>
          <Link href="/login" className="underline w-full text-center">
            Go back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

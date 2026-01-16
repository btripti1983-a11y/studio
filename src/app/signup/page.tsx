"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Registration is by invitation only.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p>To request access, please send an email to <a href="mailto:sumsub@atomicmail.io" className="underline">sumsub@atomicmail.io</a>.</p>
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

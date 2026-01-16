"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Request Access</CardTitle>
          <CardDescription>
            To create an account, you must submit your qualifications for review.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <p className="text-sm text-muted-foreground">
                    Please send an email to{' '}
                    <a href="mailto:sumsub@atomicmail.io" className="font-medium text-primary underline">
                        sumsub@atomicmail.io
                    </a>{' '}
                    with the following information:
                </p>
                <ul className="mt-3 list-disc list-inside space-y-1.5 text-sm text-muted-foreground pl-2">
                    <li>Your full name and contact information</li>
                    <li>A clear copy of your national ID</li>
                    <li>A summary of your qualifications or relevant experience</li>
                </ul>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
                Your application will be reviewed by our team. If approved, you will receive an access code via email to enter the platform.
            </p>
        </CardContent>
        <CardFooter>
            <Button asChild className="w-full" variant="outline">
                <Link href="/login">
                    Back to Login
                </Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

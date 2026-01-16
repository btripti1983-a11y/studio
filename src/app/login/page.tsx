"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginPage() {
  const [code, setCode] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loginWithCode } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast({
        variant: "destructive",
        title: "Agreement Required",
        description: "You must agree to the terms and policies to proceed.",
      });
      return;
    }

    setLoading(true);
    try {
      await loginWithCode(code);
      router.push('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid access code. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <main className="flex w-full max-w-sm flex-1 flex-col items-center justify-center">
        <Image
          src="https://res.cloudinary.com/deawcz3cy/image/upload/v1768555145/download_czwjhc.png"
          width={64}
          height={64}
          alt="Sumsub Dutch Rewards Logo"
          className="mb-4 rounded-lg"
        />
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Enter Access Code</CardTitle>
            <CardDescription>
              Please enter the access code to enter the application.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="access-code">Access Code</Label>
                <Input
                  id="access-code"
                  type="password"
                  placeholder="Enter your code"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
               <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="terms" onCheckedChange={(checked) => setAgreed(!!checked)} />
                <label
                  htmlFor="terms"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{' '}
                  <Link href="/terms-of-service" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
                    Terms of Service
                  </Link>{', '}
                  <Link href="/terms-and-conditions" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
                    Terms & Conditions
                  </Link>{', and '}
                  <Link href="/privacy-policy" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={loading || !agreed}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enter
              </Button>
            </CardFooter>
          </form>
          <div className="relative mb-4 px-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                    Or
                    </span>
                </div>
            </div>
            <div className="px-6 pb-6 text-center text-sm">
                <span className="text-muted-foreground">Don&apos;t have an access code? </span>
                <Link
                    href="/signup"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                >
                    Request Access
                </Link>
            </div>
        </Card>
      </main>
      <footer className="w-full py-4 text-center text-sm text-muted-foreground">
          <Link href="/terms-of-service" className="mx-2 hover:text-primary">Terms of Service</Link> |
          <Link href="/terms-and-conditions" className="mx-2 hover:text-primary">Terms & Conditions</Link> |
          <Link href="/privacy-policy" className="mx-2 hover:text-primary">Privacy Policy</Link>
      </footer>
    </div>
  );
}

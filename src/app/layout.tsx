import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/hooks/use-auth';
import { Toaster } from '@/components/ui/toaster';
import { DesktopOnly } from '@/components/desktop-only';
import Script from 'next/script';

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Sumsub Dutch Rewards',
  description: 'Manage tasks and rewards.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          fontInter.variable
        )}
      >
        <AuthProvider>
          <DesktopOnly>
            {children}
          </DesktopOnly>
          <Toaster />
        </AuthProvider>
        <Script id="chatling-config" strategy="afterInteractive">
          {`window.chtlConfig = { chatbotId: "1545192964" }`}
        </Script>
        <Script 
          id="chtl-script"
          src="https://chatling.ai/js/embed.js"
          data-id="1545192964"
          async
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

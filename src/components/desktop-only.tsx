"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Smartphone, Loader2 } from "lucide-react";

export function DesktopOnly({ children }: { children: React.ReactNode }) {
    const isMobile = useIsMobile(); // This can return true, false, or undefined initially.

    // While we are waiting for the client-side check to complete,
    // isMobile will be undefined. We should show a loader to prevent
    // flashing the page content before the restriction is enforced.
    if (isMobile === undefined) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    // If the hook confirms it's a mobile device, show the blocking message.
    if (isMobile) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background p-4">
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Smartphone /> Mobile Access Denied
                        </CardTitle>
                        <CardDescription>
                            This application is designed for desktop use only.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Please access this site from a desktop or laptop computer.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // If it's not a mobile device, render the actual application.
    return <>{children}</>;
}

"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Smartphone, Loader2 } from "lucide-react";

export function DesktopOnly({ children }: { children: React.ReactNode }) {
    const isMobile = useIsMobile();

    // While security checks are running, show a loader to prevent content flash.
    if (isMobile === undefined) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    // If any check fails (isMobile is true), show the blocking page.
    if (isMobile) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <CardTitle className="flex justify-center items-center gap-2">
                            <Smartphone className="h-6 w-6" /> Access Denied
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg">
                           This platform is only accessible from a desktop computer.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // If all checks pass, render the application.
    return <>{children}</>;
}

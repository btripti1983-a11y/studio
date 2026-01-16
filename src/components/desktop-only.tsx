"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertTriangle, Loader2 } from "lucide-react";

export function DesktopOnly({ children }: { children: React.ReactNode }) {
    const isMobile = useIsMobile();

    if (isMobile === undefined) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (isMobile) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background p-4">
                <Card className="w-full max-w-lg text-center border-destructive bg-destructive/5">
                    <CardHeader>
                        <CardTitle className="flex justify-center items-center gap-2 text-destructive">
                            <AlertTriangle className="h-6 w-6" /> Security Violation Detected
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-6">
                        <p className="text-base text-foreground/90">
                            This platform uses GPU-level hardware verification to detect mobile devices,
                            desktop mode spoofing, and emulation.
                        </p>
                        <p className="text-base text-foreground/90">
                            Attempts to access this platform from a mobile device, even using desktop mode,
                            will be detected and logged.
                        </p>
                        <p className="font-semibold text-destructive">
                            Bypassing or emulating a desktop environment may result in account suspension
                            or permanent access restriction.
                        </p>
                        <p className="text-base text-foreground/90 pt-2">
                            Please use a genuine desktop or laptop computer to continue.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return <>{children}</>;
}

"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Smartphone, Loader2 } from "lucide-react";

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
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <CardTitle className="flex justify-center items-center gap-2">
                            <Smartphone className="h-6 w-6" /> Access Denied
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg">
                           This platform is accessible only from desktop or laptop computers.
                           Mobile devices are not supported.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return <>{children}</>;
}

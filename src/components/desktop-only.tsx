"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Smartphone } from "lucide-react";

export function DesktopOnly({ children }: { children: React.ReactNode }) {
    const isMobile = useIsMobile();
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // This ensures we don't show anything on the server,
        // and only show content on the client after checking the device.
        setShowContent(true);
    }, []);

    if (!showContent) {
        // Render nothing on the server to avoid hydration issues,
        // you can also render a loader here.
        return null;
    }

    if (isMobile) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background p-4">
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Smartphone /> Mobile Access Denied
                        </CardTitle>
                        <CardDescription>
                            This application is only available on desktop devices.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Please access this site from a desktop or laptop computer.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return <>{children}</>;
}

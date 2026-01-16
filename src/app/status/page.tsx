"use client";

import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

const services = [
    { name: "General Operational" },
    { name: "Balance Processing" },
    { name: "Order Creation Service" },
    { name: "Deposit Service" },
    { name: "Withdrawal Service" },
    { name: "API Status" },
];

export default function StatusPage() {
    const [lastUpdated, setLastUpdated] = useState('');

    useEffect(() => {
        // As per request, use static date for now.
        setLastUpdated("Last updated on Jan 16 at 05:10 AM AST");
    }, []);

    return (
        <div className="min-h-screen bg-secondary">
            <div className="container mx-auto max-w-4xl py-12 px-4">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-bold mb-3">System Status</h1>
                    <p className="text-2xl font-semibold text-green-500">All services are online</p>
                    <p className="text-muted-foreground mt-2">{lastUpdated}</p>
                </header>

                <Card className="rounded-lg shadow-md">
                    <CardContent className="p-0">
                        {services.map((service, index) => (
                           <div key={service.name}>
                               <div className="grid grid-cols-[1fr,auto] items-center p-6 gap-4">
                                   <p className="font-semibold text-lg">{service.name}</p>
                                   <div className="flex items-center gap-2 text-green-500">
                                        <CheckCircle2 className="h-5 w-5" />
                                        <span className="font-medium">Operational</span>
                                    </div>
                               </div>
                               <div className="px-6 pb-6">
                                    <div className="h-8 w-full rounded bg-green-500" title="90-day uptime history" />
                                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                                        <span>90 days ago</span>
                                        <span>Today</span>
                                    </div>
                               </div>
                               <div className="px-6 pb-6 text-right text-sm text-muted-foreground">
                                    Last 90 days: <span className="font-semibold text-green-600">100.000%</span> Uptime
                               </div>
                                {index < services.length - 1 && <Separator />}
                           </div>
                        ))}
                    </CardContent>
                </Card>

                 <div className="mt-12 text-center">
                    <h2 className="text-2xl font-semibold mb-4">Past Incidents</h2>
                     <Card>
                        <CardContent className="p-6">
                            <p className="text-muted-foreground">No incidents reported in the last 90 days.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

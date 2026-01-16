"use client";

import { useAuth } from "@/hooks/use-auth";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { ProxyStatusTable } from "@/components/dashboard/proxy-status-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Info, ShieldCheck } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Welcome, {user?.name || 'User'} 👋
        </h2>
        <p className="text-muted-foreground">
          This is your main control panel. Track your task activity, earnings, and account status in real time.
        </p>
      </div>

      <OverviewCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Activity Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Users can complete AI-based tasks to earn rewards. Submitted tasks go through a review process. Approved tasks add to your available balance.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Proxy & Link Status</p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                <p className="text-sm font-semibold text-green-500">Active</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Account Security</p>
              <p className="text-sm font-semibold text-green-500">Protected</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ProxyStatusTable />

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Navigation Tip</AlertTitle>
        <AlertDescription>
          Use the sidebar to navigate between Dashboard, Tasks, Withdraw, and Users.
        </AlertDescription>
      </Alert>
    </div>
  );
}

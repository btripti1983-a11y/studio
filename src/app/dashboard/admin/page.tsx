"use client";
import { AdminTabs } from "@/components/admin/admin-tabs";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export default function AdminPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user?.isAdmin) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);


    if (!user?.isAdmin) {
        return (
            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
                 <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ShieldAlert/> Access Denied</CardTitle>
                        <CardDescription>You do not have permission to view this page.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Redirecting to dashboard...</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Admin Panel</h1>
      </div>
      <div className="space-y-4">
        <AdminTabs />
      </div>
    </div>
  );
}

"use client";
import { AdminTabs } from "@/components/admin/admin-tabs";

export default function AdminPage() {
    return (
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <div className="flex items-center justify-between space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            </div>
            <div className="space-y-4">
                <AdminTabs />
            </div>
        </div>
    );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Loader, XCircle } from "lucide-react";

// Mock data
const taskStats = {
  approved: 42,
  pending: 5,
  rejected: 2,
};

const stats = [
  {
    title: "Approved Tasks",
    value: taskStats.approved,
    icon: CheckCircle2,
    color: "text-green-500",
  },
  {
    title: "Pending Tasks",
    value: taskStats.pending,
    icon: Loader,
    color: "text-yellow-500",
  },
  {
    title: "Rejected Tasks",
    value: taskStats.rejected,
    icon: XCircle,
    color: "text-red-500",
  },
];

export function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              Total tasks with this status
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

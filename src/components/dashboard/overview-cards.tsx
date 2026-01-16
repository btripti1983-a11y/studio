"use client";

import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  DollarSign,
  ListChecks,
  Loader,
  XCircle,
} from "lucide-react";

// Mock data
const taskStats = {
  submitted: 49,
  pending: 5,
  approved: 42,
  rejected: 2,
};

export function OverviewCards() {
  const { user } = useAuth();
  const balance = user?.balance || 0;

  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(balance);

  const stats = [
    {
      title: "Total Tasks Submitted",
      value: taskStats.submitted,
      icon: ListChecks,
      color: "text-blue-500",
    },
    {
      title: "Tasks Pending Review",
      value: taskStats.pending,
      icon: Loader,
      color: "text-yellow-500",
    },
    {
      title: "Tasks Approved",
      value: taskStats.approved,
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      title: "Tasks Rejected",
      value: taskStats.rejected,
      icon: XCircle,
      color: "text-red-500",
    },
    {
      title: "Available Balance",
      value: formattedBalance,
      icon: DollarSign,
      color: "text-green-500",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

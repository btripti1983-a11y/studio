import { BalanceCard } from "@/components/dashboard/balance-card";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { ProxyStatusTable } from "@/components/dashboard/proxy-status-table";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
      </div>
      <div className="space-y-4">
        <OverviewCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="lg:col-span-4">
                <ProxyStatusTable />
            </div>
            <div className="lg:col-span-3">
                <BalanceCard />
            </div>
        </div>
      </div>
    </div>
  );
}

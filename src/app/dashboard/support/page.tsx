import { SupportTabs } from "@/components/support/support-tabs";

export default function SupportPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
      </div>
      <SupportTabs />
    </div>
  );
}

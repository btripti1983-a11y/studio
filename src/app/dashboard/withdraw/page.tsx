import { WithdrawalForm } from "@/components/withdraw/withdrawal-form";
import { WithdrawalHistoryTable } from "@/components/withdraw/withdrawal-history-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function WithdrawPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Withdrawals</h1>
      </div>
      <Tabs defaultValue="request" className="space-y-4">
        <TabsList>
          <TabsTrigger value="request">Request Withdrawal</TabsTrigger>
          <TabsTrigger value="history">Withdrawal History</TabsTrigger>
        </TabsList>
        <TabsContent value="request">
          <WithdrawalForm />
        </TabsContent>
        <TabsContent value="history">
          <WithdrawalHistoryTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}

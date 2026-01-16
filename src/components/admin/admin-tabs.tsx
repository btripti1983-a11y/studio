import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TasksTable } from "./tasks-table";
import { WithdrawalsTable } from "./withdrawals-table";
import { ProxiesTable } from "./proxies-table";
import { BalanceUpdater } from "./balance-updater";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function AdminTabs() {
  return (
    <Tabs defaultValue="tasks" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
        <TabsTrigger value="proxies">Proxies</TabsTrigger>
        <TabsTrigger value="balance">Balance AI</TabsTrigger>
      </TabsList>
      <TabsContent value="tasks">
        <Card>
            <CardHeader>
                <CardTitle>Task Management</CardTitle>
                <CardDescription>Approve or reject user-submitted tasks.</CardDescription>
            </CardHeader>
            <CardContent>
                <TasksTable />
            </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="withdrawals">
        <Card>
            <CardHeader>
                <CardTitle>Withdrawal Requests</CardTitle>
                <CardDescription>Manage pending withdrawal requests.</CardDescription>
            </CardHeader>
            <CardContent>
                <WithdrawalsTable />
            </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="proxies">
        <Card>
            <CardHeader>
                <CardTitle>Proxy/Link Status</CardTitle>
                <CardDescription>Manage the status of proxies and links.</CardDescription>
            </CardHeader>
            <CardContent>
                <ProxiesTable />
            </CardContent>
        </Card>
      </TabsContent>
       <TabsContent value="balance">
        <BalanceUpdater />
      </TabsContent>
    </Tabs>
  );
}

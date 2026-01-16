import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <div className="space-y-4">
        <Card>
            <CardHeader>
                <CardTitle>Welcome to your Dashboard</CardTitle>
                <CardDescription>This is a simplified dashboard. You can navigate to other sections using the sidebar.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>All your tools and information are available in the sidebar.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

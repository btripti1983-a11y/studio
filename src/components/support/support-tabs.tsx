"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateTicketForm } from "./create-ticket-form";
import { MyTicketsTable } from "./my-tickets-table";

export function SupportTabs() {
  return (
    <Tabs defaultValue="my-tickets" className="space-y-4">
      <TabsList>
        <TabsTrigger value="my-tickets">My Tickets</TabsTrigger>
        <TabsTrigger value="create">Create New Ticket</TabsTrigger>
      </TabsList>
      <TabsContent value="my-tickets">
        <MyTicketsTable />
      </TabsContent>
      <TabsContent value="create">
        <CreateTicketForm />
      </TabsContent>
    </Tabs>
  );
}

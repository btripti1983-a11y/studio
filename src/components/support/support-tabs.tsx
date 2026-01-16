"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateTicketForm } from "./create-ticket-form";
import { MyTicketsTable } from "./my-tickets-table";
import type { SupportTicket } from '@/types';

export function SupportTabs() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [activeTab, setActiveTab] = useState('create');

  const handleCreateTicket = (newTicketData: { subject: string; category: SupportTicket['category']; message: string }) => {
    const newTicket: SupportTicket = {
      id: `TICKET-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      subject: newTicketData.subject,
      category: newTicketData.category,
      status: 'Open',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTickets(prevTickets => [newTicket, ...prevTickets]);
    setActiveTab('my-tickets'); // Switch to the tickets list after creation
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="my-tickets">My Tickets</TabsTrigger>
        <TabsTrigger value="create">Create New Ticket</TabsTrigger>
      </TabsList>
      <TabsContent value="my-tickets">
        <MyTicketsTable tickets={tickets} />
      </TabsContent>
      <TabsContent value="create">
        <CreateTicketForm onCreateTicket={handleCreateTicket} />
      </TabsContent>
    </Tabs>
  );
}

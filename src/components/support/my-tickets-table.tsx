"use client";

import type { SupportTicket } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

const mockTickets: SupportTicket[] = [];

export function MyTicketsTable() {

  const getStatusBadge = (status: SupportTicket['status']) => {
    switch (status) {
        case 'Open': return <Badge className="bg-blue-500 hover:bg-blue-500/90 text-primary-foreground">Open</Badge>;
        case 'In Review': return <Badge className="bg-yellow-500 hover:bg-yellow-500/90 text-primary-foreground">In Review</Badge>;
        case 'Awaiting User': return <Badge className="bg-orange-500 hover:bg-orange-500/90 text-primary-foreground">Awaiting User</Badge>;
        case 'Resolved': return <Badge className="bg-green-500 hover:bg-green-500/90 text-primary-foreground">Resolved</Badge>;
        case 'Closed': return <Badge variant="secondary">Closed</Badge>;
    }
  };

  return (
    <Card>
       <CardHeader>
        <CardTitle>My Support Tickets</CardTitle>
        <CardDescription>
            Here is a list of your support tickets. Click 'View' to see the conversation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTickets.length > 0 ? (
              mockTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>{ticket.category}</TableCell>
                  <TableCell>{ticket.updatedAt.toLocaleDateString()}</TableCell>
                  <TableCell>
                      {getStatusBadge(ticket.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  You have not created any support tickets.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

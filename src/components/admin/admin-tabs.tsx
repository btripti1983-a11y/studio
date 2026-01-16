"use client";

import { useState } from 'react';
import type { SiteUser } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '../ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const initialMockUsers: SiteUser[] = [
    { id: "user-1", email: "rahul.sharma@demo-mail.in", status: "pending", proxy: "res.proxy-seller.com:10021:05fc10bdf3bd71a1:tM6LIvN1", sumsubLink: "https://in.sumsub.com/websdk/p/wXfhr6II6EimbXvA?from=linkMobile" },
    { id: "user-2", email: "ananya.roy@demo-mail.in", status: "pending", proxy: "res.proxy-seller.com:10022:05fc10bdf3bd71a2:tM6LIvN2", sumsubLink: "https://in.sumsub.com/websdk/p/wXfhr6II6EimbXvB?from=linkMobile" },
    { id: "user-3", email: "rohit.verma@demo-mail.in", status: "pending", proxy: "res.proxy-seller.com:10023:05fc10bdf3bd71a3:tM6LIvN3", sumsubLink: "https://in.sumsub.com/websdk/p/wXfhr6II6EimbXvC?from=linkMobile" },
    { id: "user-4", email: "priya.mukherjee@demo-mail.in", status: "pending", proxy: "res.proxy-seller.com:10024:05fc10bdf3bd71a4:tM6LIvN4", sumsubLink: "https://in.sumsub.com/websdk/p/wXfhr6II6EimbXvD?from=linkMobile" },
    { id: "user-5", email: "amit.patel@demo-mail.in", status: "pending", proxy: "res.proxy-seller.com:10025:05fc10bdf3bd71a5:tM6LIvN5", sumsubLink: "https://in.sumsub.com/websdk/p/wXfhr6II6EimbXvE?from=linkMobile" },
    { id: "user-6", email: "neha.singh@demo-mail.in", status: "pending", proxy: "res.proxy-seller.com:10026:05fc10bdf3bd71a6:tM6LIvN6", sumsubLink: "https://in.sumsub.com/websdk/p/wXfhr6II6EimbXvF?from=linkMobile" },
    { id: "user-7", email: "arjun.nair@demo-mail.in", status: "pending", proxy: "res.proxy-seller.com:10027:05fc10bdf3bd71a7:tM6LIvN7", sumsubLink: "https://in.sumsub.com/websdk/p/wXfhr6II6EimbXvG?from=linkMobile" },
];

// This component now renders the Users panel
export function AdminTabs() { 
    const [users, setUsers] = useState<SiteUser[]>(initialMockUsers);

    const getStatusBadge = (status: SiteUser['status']) => {
        switch (status) {
            case 'verified': return <Badge className="bg-green-500 hover:bg-green-500/90 text-primary-foreground">Verified</Badge>;
            case 'pending': return <Badge className="bg-yellow-500 hover:bg-yellow-500/90 text-primary-foreground">Pending</Badge>;
            case 'rejected': return <Badge variant="destructive">Rejected</Badge>;
        }
    };

    return (
      <Card>
        <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>View and manage user statuses.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Proxy (Residential Format)</TableHead>
                  <TableHead className="text-right">Sumsub Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{user.proxy}</TableCell>
                    <TableCell className="text-right">
                        <Button asChild variant="link">
                            <Link href={user.sumsubLink} target="_blank">View</Link>
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
    );
}

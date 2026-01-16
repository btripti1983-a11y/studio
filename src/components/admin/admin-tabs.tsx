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
    { id: "user-1", email: "user.one@example.com", status: "pending", proxy: "192.168.1.10", sumsubLink: "https://sumsub.com/user/10" },
    { id: "user-2", email: "user.two@example.com", status: "pending", proxy: "10.0.0.5", sumsubLink: "https://sumsub.com/user/11" },
    { id: "user-3", email: "user.three@example.com", status: "pending", proxy: "172.16.0.23", sumsubLink: "https://sumsub.com/user/12" },
    { id: "user-4", email: "user.four@example.com", status: "pending", proxy: "203.0.113.45", sumsubLink: "https://sumsub.com/user/13" },
    { id: "user-5", email: "user.five@example.com", status: "pending", proxy: "198.51.100.8", sumsubLink: "https://sumsub.com/user/14" },
    { id: "user-6", email: "user.six@example.com", status: "pending", proxy: "192.0.2.1", sumsubLink: "https://sumsub.com/user/15" },
    { id: "user-7", email: "user.seven@example.com", status: "pending", proxy: "8.8.8.8", sumsubLink: "https://sumsub.com/user/16" },
];

// This component now renders the Users panel
export function AdminTabs() { 
    const [users, setUsers] = useState<SiteUser[]>(initialMockUsers);

    const getStatusBadge = (status: SiteUser['status']) => {
        switch (status) {
            case 'verified': return <Badge className="bg-green-600">Verified</Badge>;
            case 'pending': return <Badge variant="secondary">Pending</Badge>;
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
                  <TableHead>Proxy</TableHead>
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

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
  { id: "user-1", email: "john.doe@example.com", status: "verified", proxy: "192.168.1.1", sumsubLink: "https://sumsub.com/user/1" },
  { id: "user-2", email: "jane.smith@example.com", status: "pending", proxy: "192.168.1.2", sumsubLink: "https://sumsub.com/user/2" },
  { id: "user-3", email: "peter.jones@example.com", status: "rejected", proxy: "192.168.1.3", sumsubLink: "https://sumsub.com/user/3" },
  { id: "user-4", email: "susan.williams@example.com", status: "verified", proxy: "192.168.1.4", sumsubLink: "https://sumsub.com/user/4" },
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

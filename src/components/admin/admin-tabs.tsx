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
    { id: "user-1", email: "rahul.sharma@demo-mail.in", status: "pending", proxy: "in.res.proxy:10001:user1:pass1", sumsubLink: "https://sumsub.com/user/1" },
    { id: "user-2", email: "ananya.roy@demo-mail.in", status: "pending", proxy: "in.res.proxy:10002:user2:pass2", sumsubLink: "https://sumsub.com/user/2" },
    { id: "user-3", email: "rohit.verma@demo-mail.in", status: "pending", proxy: "in.res.proxy:10003:user3:pass3", sumsubLink: "https://sumsub.com/user/3" },
    { id: "user-4", email: "priya.mukherjee@demo-mail.in", status: "pending", proxy: "in.res.proxy:10004:user4:pass4", sumsubLink: "https://sumsub.com/user/4" },
    { id: "user-5", email: "amit.patel@demo-mail.in", status: "pending", proxy: "in.res.proxy:10005:user5:pass5", sumsubLink: "https://sumsub.com/user/5" },
    { id: "user-6", email: "neha.singh@demo-mail.in", status: "pending", proxy: "in.res.proxy:10006:user6:pass6", sumsubLink: "https://sumsub.com/user/6" },
    { id: "user-7", email: "arjun.nair@demo-mail.in", status: "pending", proxy: "in.res.proxy:10007:user7:pass7", sumsubLink: "https://sumsub.com/user/7" },
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

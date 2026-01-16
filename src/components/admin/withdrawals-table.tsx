"use client";

import { useState } from 'react';
import type { Withdrawal } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialMockWithdrawals: Withdrawal[] = [
  { id: 'wd-1', userId: 'user-a', userEmail: 'user.a@test.com', amount: 50.00, walletAddress: 'bc1q...', status: 'approved', createdAt: new Date(Date.now() - 86400000 * 3) },
  { id: 'wd-2', userId: 'user-b', userEmail: 'user.b@test.com', amount: 120.50, walletAddress: 'bc1q...', status: 'pending', createdAt: new Date(Date.now() - 3600000 * 2) },
  { id: 'wd-3', userId: 'user-c', userEmail: 'user.c@test.com', amount: 75.25, walletAddress: 'bc1q...', status: 'rejected', createdAt: new Date(Date.now() - 86400000) },
  { id: 'wd-4', userId: 'user-d', userEmail: 'user.d@test.com', amount: 200.00, walletAddress: 'bc1q...', status: 'pending', createdAt: new Date() },
];

export function WithdrawalsTable() {
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(initialMockWithdrawals);
    const { toast } = useToast();

    const handleUpdateStatus = (withdrawalId: string, status: 'approved' | 'rejected') => {
        setWithdrawals(prev =>
            prev.map(w =>
                w.id === withdrawalId ? { ...w, status } : w
            )
        );
        toast({
            title: `Withdrawal ${status}`,
            description: `The withdrawal request has been ${status}.`,
        });
    };

    const getStatusBadge = (status: Withdrawal['status']) => {
        switch (status) {
            case 'approved': return <Badge className="bg-green-600">Approved</Badge>;
            case 'pending': return <Badge variant="secondary">Pending</Badge>;
            case 'rejected': return <Badge variant="destructive">Rejected</Badge>;
        }
    };

    return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Wallet Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {withdrawals.map((withdrawal) => (
              <TableRow key={withdrawal.id}>
                <TableCell>{withdrawal.userEmail}</TableCell>
                <TableCell>${withdrawal.amount.toFixed(2)}</TableCell>
                <TableCell className="truncate max-w-xs">{withdrawal.walletAddress}</TableCell>
                <TableCell>{getStatusBadge(withdrawal.status)}</TableCell>
                <TableCell>{withdrawal.createdAt.toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                    {withdrawal.status === 'pending' && (
                        <div className="flex gap-2 justify-end">
                            <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(withdrawal.id, 'rejected')}>
                                <ThumbsDown className="mr-1 h-4 w-4" /> Reject
                            </Button>
                            <Button size="sm" onClick={() => handleUpdateStatus(withdrawal.id, 'approved')}>
                                <ThumbsUp className="mr-1 h-4 w-4" /> Approve
                            </Button>
                        </div>
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    );
}

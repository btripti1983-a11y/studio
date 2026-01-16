"use client";

import type { Withdrawal } from "@/types";
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

const mockWithdrawals: Withdrawal[] = [
  { id: "wd-1", userId: "user-1", userEmail: "demo@user.com", currency: "BTC", walletAddress: "bc1q...", amount: 50.00, status: 'approved', createdAt: new Date("2024-07-15T10:00:00Z") },
  { id: "wd-2", userId: "user-1", userEmail: "demo@user.com", currency: "USDT", walletAddress: "0xAb...", amount: 120.50, status: 'pending', createdAt: new Date("2024-07-28T14:30:00Z") },
  { id: "wd-3", userId: "user-1", userEmail: "demo@user.com", currency: "LTC", walletAddress: "ltc1q...", amount: 75.25, status: 'rejected', createdAt: new Date("2024-07-20T09:00:00Z") },
];

export function WithdrawalHistoryTable() {

  const getStatusBadge = (status: Withdrawal['status']) => {
    switch (status) {
        case 'approved': return <Badge className="bg-green-500 hover:bg-green-500/90 text-primary-foreground">Approved</Badge>;
        case 'pending': return <Badge className="bg-yellow-500 hover:bg-yellow-500/90 text-primary-foreground">Pending</Badge>;
        case 'rejected': return <Badge variant="destructive">Rejected</Badge>;
    }
  };

  return (
    <Card>
       <CardHeader>
        <CardTitle>Withdrawal History</CardTitle>
        <CardDescription>
            A record of your past withdrawal requests.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Amount (USD)</TableHead>
              <TableHead>Wallet Address</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockWithdrawals.map((withdrawal) => (
              <TableRow key={withdrawal.id}>
                <TableCell className="font-medium">{withdrawal.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>{withdrawal.currency}</TableCell>
                <TableCell>${withdrawal.amount.toFixed(2)}</TableCell>
                <TableCell className="truncate max-w-xs">{withdrawal.walletAddress}</TableCell>
                <TableCell className="text-right">
                    {getStatusBadge(withdrawal.status)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

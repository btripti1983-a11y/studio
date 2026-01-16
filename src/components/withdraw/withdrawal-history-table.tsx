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

const mockWithdrawals: Withdrawal[] = [];

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
            {mockWithdrawals.length > 0 ? (
              mockWithdrawals.map((withdrawal) => (
                <TableRow key={withdrawal.id}>
                  <TableCell className="font-medium">{withdrawal.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell>{withdrawal.currency}</TableCell>
                  <TableCell>${withdrawal.amount.toFixed(2)}</TableCell>
                  <TableCell className="truncate max-w-xs">{withdrawal.walletAddress}</TableCell>
                  <TableCell className="text-right">
                      {getStatusBadge(withdrawal.status)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No withdrawals made yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

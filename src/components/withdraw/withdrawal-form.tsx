"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const payoutMethods = ["USDT", "BTC", "TRX", "LTC"];


export function WithdrawalForm() {
    const [amount, setAmount] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [currency, setCurrency] = useState('BTC');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const { user } = useAuth();
    
    const balance = user?.balance || 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const withdrawalAmount = parseFloat(amount);

        if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
            toast({
                variant: 'destructive',
                title: 'Invalid Amount',
                description: 'Please enter a valid positive number for the amount.',
            });
            return;
        }

        if (withdrawalAmount > balance) {
            toast({
                variant: 'destructive',
                title: 'Insufficient Balance',
                description: 'You cannot withdraw more than your available balance.',
            });
            return;
        }

        if (!walletAddress.trim()) {
            toast({
                variant: 'destructive',
                title: 'Wallet Address Required',
                description: 'Please enter your wallet address.',
            });
            return;
        }

        setLoading(true);
        // Simulate API call to save the withdrawal request
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Withdrawal Request:', { currency, amount: withdrawalAmount, walletAddress });

        setLoading(false);
        setAmount('');
        setWalletAddress('');
        toast({
            title: 'Withdrawal Request Submitted',
            description: 'Your request is being processed and will be reviewed by an admin.',
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Request Withdrawal</CardTitle>
                <CardDescription>Select your currency, enter your wallet address, and the amount you wish to withdraw.</CardDescription>
                 <CardDescription className="pt-2">Available to withdraw: <span className="font-bold text-primary">${balance.toFixed(2)}</span></CardDescription>
                 <CardDescription className="pt-2 text-yellow-400">Minimum withdrawal requires 5 verified accounts.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="currency">Payout Currency</Label>
                        <Select onValueChange={setCurrency} defaultValue={currency}>
                            <SelectTrigger id="currency">
                                <SelectValue placeholder="Select a currency" />
                            </SelectTrigger>
                            <SelectContent>
                                {payoutMethods.map((method) => (
                                    <SelectItem key={method} value={method}>{method}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount (USD)</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="e.g., 50.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            max={balance}
                            step="0.01"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="walletAddress">Wallet Address</Label>
                        <Input
                            id="walletAddress"
                            type="text"
                            placeholder="Enter your wallet address"
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardContent>
                    <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Request Withdrawal
                    </Button>
                </CardContent>
            </form>
        </Card>
    );
}

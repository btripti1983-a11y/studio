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

const lockedAddresses: Record<string, string> = {
    "USDT": "0xd9423913b016fa1412fae95382b3d7376817b40a",
    "BTC": "36TsnxcPXiKvdHf112XFdexRpBHa8EsWSB",
    "TRX": "TQ1CTp1CcHriBAsbyPZj6YQU9WrW3ErqYb",
    "LTC": "ltc1q93n2q7qdncp33eswscwfx62wxl9w7gpz47jl56"
};


export function WithdrawalForm() {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('BTC');
    const [walletAddress, setWalletAddress] = useState(lockedAddresses.BTC);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const { user } = useAuth();
    
    const balance = user?.balance || 0;

    const handleCurrencyChange = (value: string) => {
        setCurrency(value);
        setWalletAddress(lockedAddresses[value]);
    };

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
                description: 'A wallet address is required for withdrawals.',
            });
            return;
        }

        setLoading(true);
        // Simulate API call to save the withdrawal request
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Withdrawal Request:', { currency, amount: withdrawalAmount, walletAddress });

        setLoading(false);
        setAmount('');
        toast({
            title: 'Withdrawal Request Submitted',
            description: 'Your request is being processed and will be reviewed by an admin.',
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Request Withdrawal</CardTitle>
                <CardDescription>Select your currency and the amount you wish to withdraw. The destination address is locked to your account.</CardDescription>
                 <CardDescription className="pt-2">Available to withdraw: <span className="font-bold text-primary">${balance.toFixed(2)}</span></CardDescription>
                 <CardDescription className="pt-2 text-yellow-400">Minimum withdrawal requires 5 verified accounts.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="currency">Payout Currency</Label>
                        <Select onValueChange={handleCurrencyChange} defaultValue={currency}>
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
                        <Label htmlFor="walletAddress">Wallet Address (Locked)</Label>
                        <Input
                            id="walletAddress"
                            type="text"
                            value={walletAddress}
                            readOnly
                            className="bg-muted cursor-not-allowed"
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

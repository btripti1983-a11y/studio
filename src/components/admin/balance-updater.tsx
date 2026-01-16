"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { smartBalanceUpdate, SmartBalanceUpdateOutput } from '@/ai/flows/smart-balance-update';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function BalanceUpdater() {
    const [proposedBalance, setProposedBalance] = useState('');
    const [currentBalance, setCurrentBalance] = useState('1337.42'); // Mock current balance
    const [loading, setLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState<SmartBalanceUpdateOutput | null>(null);
    const { toast } = useToast();

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setAiResponse(null);
        try {
            const response = await smartBalanceUpdate({
                currentBalance: parseFloat(currentBalance),
                proposedBalance: proposedBalance,
            });
            setAiResponse(response);
            if (response.shouldUpdate) {
                toast({ title: "AI Suggestion: Update Balance", description: response.reason });
            } else {
                 toast({ variant: 'destructive', title: "AI Suggestion: Do Not Update", description: response.reason });
            }
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: "Error",
                description: "Failed to get AI suggestion.",
            });
        }
        setLoading(false);
    };

    const applyUpdate = () => {
        if(aiResponse?.shouldUpdate && aiResponse.updatedBalance) {
            setCurrentBalance(aiResponse.updatedBalance.toString());
            toast({ title: "Balance Updated", description: `New balance set to $${aiResponse.updatedBalance}.` });
            setAiResponse(null);
            setProposedBalance('');
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Smart Balance Update</CardTitle>
                <CardDescription>
                    Use AI to validate and update a user's balance. The current balance for this demo user is ${currentBalance}.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleUpdate}>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="proposed-balance">Proposed New Balance</Label>
                        <Input
                            id="proposed-balance"
                            value={proposedBalance}
                            onChange={(e) => setProposedBalance(e.target.value)}
                            placeholder="e.g., 1500 or 'one thousand five hundred'"
                        />
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Get AI Suggestion
                    </Button>
                </CardContent>
            </form>
            {aiResponse && (
                <CardContent>
                    <Alert variant={aiResponse.shouldUpdate ? "default" : "destructive"} className={aiResponse.shouldUpdate ? 'border-green-500' : 'border-red-500'}>
                        <AlertTitle>{aiResponse.shouldUpdate ? "Update Recommended" : "Update Rejected"}</AlertTitle>
                        <AlertDescription>{aiResponse.reason}</AlertDescription>
                        {aiResponse.shouldUpdate && (
                             <AlertDescription className="font-bold mt-2">
                                New Balance: ${aiResponse.updatedBalance?.toFixed(2)}
                            </AlertDescription>
                        )}
                        {aiResponse.shouldUpdate && (
                            <div className="mt-4">
                                <Button onClick={applyUpdate}>Apply Update</Button>
                            </div>
                        )}
                    </Alert>
                </CardContent>
            )}
        </Card>
    );
}

"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const ticketCategories = [
    'Task Issue',
    'Withdrawal Issue',
    'Account Access',
    'Verification / KYC',
    'Technical Problem',
    'Other'
];

export function CreateTicketForm() {
    const [subject, setSubject] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!subject || !category || !message) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please fill out all fields to create a ticket.',
            });
            return;
        }

        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('New Ticket:', { subject, category, message });

        setLoading(false);
        setSubject('');
        setCategory('');
        setMessage('');
        toast({
            title: 'Ticket Created',
            description: 'Your support ticket has been successfully created. We will get back to you shortly.',
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create a New Support Ticket</CardTitle>
                <CardDescription>Fill out the form below to get in touch with our support team.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                            id="subject"
                            placeholder="e.g., Issue with task #123"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={setCategory} value={category}>
                            <SelectTrigger id="category">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {ticketCategories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            placeholder="Please describe your issue in detail..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="min-h-[150px]"
                        />
                    </div>
                </CardContent>
                <CardContent>
                    <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Ticket
                    </Button>
                </CardContent>
            </form>
        </Card>
    );
}

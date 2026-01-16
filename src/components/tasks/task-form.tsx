"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const aiQuestion = "Describe the key differences between supervised and unsupervised machine learning. Provide an example for each.";

export function TaskForm() {
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!answer.trim()) {
            toast({
                variant: 'destructive',
                title: 'Answer is empty',
                description: 'Please provide an answer before submitting.',
            });
            return;
        }

        setLoading(true);
        // Simulate API call to save the task
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Submitted Task:', { question: aiQuestion, answer });

        setLoading(false);
        setAnswer('');
        toast({
            title: 'Task Submitted',
            description: 'Your answer has been submitted for review.',
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">New Task</CardTitle>
                <CardDescription>Answer the question below to earn rewards.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Question</Label>
                        <p className="text-sm p-4 bg-muted rounded-md">{aiQuestion}</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="answer">Your Answer</Label>
                        <Textarea
                            id="answer"
                            placeholder="Type your detailed answer here..."
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            rows={8}
                        />
                    </div>
                </CardContent>
                <CardContent>
                    <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit for Review
                    </Button>
                </CardContent>
            </form>
        </Card>
    );
}

"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';
import { askAi } from '@/ai/flows/ask-ai-flow';

export function AskAiForm() {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) {
            toast({
                variant: 'destructive',
                title: 'Question cannot be empty',
                description: 'Please enter a question to ask.',
            });
            return;
        }

        setLoading(true);
        setResponse('');

        try {
            const result = await askAi({ question });
            setResponse(result.answer);
        } catch (error) {
            console.error("Error calling askAi flow:", error);
            toast({
                variant: 'destructive',
                title: 'An error occurred',
                description: 'Could not get a response. Please try again later.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Ask a question</CardTitle>
                    <CardDescription>Get simple answers to basic AI and general knowledge questions.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="question">Your Question</Label>
                            <Input
                                id="question"
                                type="text"
                                placeholder="e.g., What is a large language model?"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                    </CardContent>
                    <CardContent>
                        <Button type="submit" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            Ask AI
                        </Button>
                    </CardContent>
                </form>
            </Card>

            {loading && (
                <Card className="mt-6">
                    <CardContent className="p-6 flex items-center justify-center">
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        <p className="text-muted-foreground">Thinking...</p>
                    </CardContent>
                </Card>
            )}

            {response && !loading && (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Answer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-foreground">{response}</p>
                    </CardContent>
                </Card>
            )}
        </>
    );
}

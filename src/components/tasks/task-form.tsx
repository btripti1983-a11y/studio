"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const quizQuestions = [
    { id: 'q1', question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correctAnswer: "Paris" },
    { id: 'q2', question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], correctAnswer: "Mars" },
    { id: 'q3', question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correctAnswer: "Pacific" },
    { id: 'q4', question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correctAnswer: "William Shakespeare" },
    { id: 'q5', question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "NaCl"], correctAnswer: "H2O" },
    { id: 'q6', question: "How many continents are there?", options: ["5", "6", "7", "8"], correctAnswer: "7" },
    { id: 'q7', question: "What is the tallest mammal?", options: ["Elephant", "Giraffe", "Whale", "Hippo"], correctAnswer: "Giraffe" },
    { id: 'q8', question: "Which country is home to the kangaroo?", options: ["South Africa", "India", "Australia", "Brazil"], correctAnswer: "Australia" },
    { id: 'q9', question: "What is the currency of Japan?", options: ["Won", "Yuan", "Yen", "Rupee"], correctAnswer: "Yen" },
    { id: 'q10', question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], correctAnswer: "Leonardo da Vinci" },
    { id: 'q11', question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Quartz"], correctAnswer: "Diamond" },
    { id: 'q12', question: "How many states are in the USA?", options: ["48", "50", "52", "45"], correctAnswer: "50" },
    { id: 'q13', question: "What is the largest country by area?", options: ["Canada", "China", "USA", "Russia"], correctAnswer: "Russia" },
    { id: 'q14', question: "What is the main ingredient in guacamole?", options: ["Tomato", "Avocado", "Onion", "Pepper"], correctAnswer: "Avocado" },
    { id: 'q15', question: "In which city is the famous Big Ben clock tower located?", options: ["New York", "Paris", "London", "Tokyo"], correctAnswer: "London" },
    { id: 'q16', question: "What is the square root of 64?", options: ["6", "7", "8", "9"], correctAnswer: "8" },
    { id: 'q17', question: "What is the primary language spoken in Brazil?", options: ["Spanish", "Portuguese", "English", "French"], correctAnswer: "Portuguese" },
    { id: 'q18', question: "Who was the first person to walk on the moon?", options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"], correctAnswer: "Neil Armstrong" },
    { id: 'q19', question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], correctAnswer: "2" },
    { id: 'q20', question: "How many sides does a triangle have?", options: ["2", "3", "4", "5"], correctAnswer: "3" }
];


export function TaskForm() {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleAnswerChange = (questionId: string, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (Object.keys(answers).length < quizQuestions.length) {
            toast({
                variant: 'destructive',
                title: 'Incomplete Task',
                description: 'Please answer all questions before submitting.',
            });
            setLoading(false);
            return;
        }

        let correctCount = 0;
        quizQuestions.forEach((q) => {
            if (answers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });

        const score = (correctCount / quizQuestions.length) * 100;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (score < 95) {
            toast({
                variant: 'destructive',
                title: 'Invalid Task',
                description: `You scored ${score.toFixed(0)}%. This is below 95%. Punishment applied.`,
                duration: 5000,
            });
        } else {
            toast({
                title: 'Task Submitted Successfully',
                description: `Congratulations! You scored ${score.toFixed(0)}%. Your submission is under review.`,
                duration: 5000,
            });
            setAnswers({});
        }

        setLoading(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>New Task</CardTitle>
                <CardDescription>Answer all 20 questions. You must score at least 95% to pass.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    {quizQuestions.map((q, index) => (
                        <div key={q.id} className="space-y-3 p-4 border rounded-lg">
                            <Label className="font-semibold">{index + 1}. {q.question}</Label>
                            <RadioGroup
                                value={answers[q.id]}
                                onValueChange={(value) => handleAnswerChange(q.id, value)}
                                className="space-y-2 pt-2"
                            >
                                {q.options.map((option) => (
                                    <div key={option} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                                        <Label htmlFor={`${q.id}-${option}`} className="font-normal">{option}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    ))}
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

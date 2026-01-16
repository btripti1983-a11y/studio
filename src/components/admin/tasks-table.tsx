"use client";

import { useState } from 'react';
import type { Task } from "@/types";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Check, Eye, Loader2, ThumbsDown, ThumbsUp, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { summarizeSubmittedTask } from '@/ai/flows/summarize-submitted-task';
import { ScrollArea } from '../ui/scroll-area';

const initialMockTasks: Task[] = [
  { id: 'task-1', userId: 'user-a', userEmail: 'user.a@test.com', question: "What is the capital of France?", answer: "Paris. It's known for the Eiffel Tower.", status: 'approved', createdAt: new Date(Date.now() - 86400000 * 2), reward: 5 },
  { id: 'task-2', userId: 'user-b', userEmail: 'user.b@test.com', question: "Explain the theory of relativity.", answer: "It's about time and space being relative and was developed by Einstein. It includes both special and general relativity.", status: 'pending', createdAt: new Date(Date.now() - 3600000), reward: 10 },
  { id: 'task-3', userId: 'user-c', userEmail: 'user.c@test.com', question: "What are the primary colors?", answer: "Red, green, blue.", status: 'rejected', createdAt: new Date(Date.now() - 86400000), reward: 2 },
  { id: 'task-4', userId: 'user-d', userEmail: 'user.d@test.com', question: "Describe photosynthesis.", answer: "Photosynthesis is a process used by plants, algae and certain bacteria to harness energy from sunlight and turn it into chemical energy.", status: 'pending', createdAt: new Date(), reward: 8 },
];

export function TasksTable() {
    const [tasks, setTasks] = useState<Task[]>(initialMockTasks);
    const [summary, setSummary] = useState('');
    const [loadingSummary, setLoadingSummary] = useState(false);
    const { toast } = useToast();

    const handleUpdateStatus = (taskId: string, status: 'approved' | 'rejected') => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, status } : task
            )
        );
        toast({
            title: `Task ${status}`,
            description: `The task has been successfully ${status}.`,
        });
    };
    
    const handleGenerateSummary = async (answer: string) => {
        setLoadingSummary(true);
        setSummary('');
        try {
            const result = await summarizeSubmittedTask({ answers: answer });
            setSummary(result.summary);
        } catch (error) {
            console.error(error);
            setSummary('Failed to generate summary.');
        } finally {
            setLoadingSummary(false);
        }
    };

    const getStatusBadge = (status: Task['status']) => {
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
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Reward</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.userEmail}</TableCell>
                <TableCell>{getStatusBadge(task.status)}</TableCell>
                <TableCell>{task.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>${task.reward.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" className="mr-2" onClick={() => handleGenerateSummary(task.answer)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>Task Details</DialogTitle>
                        <DialogDescription>
                          Review the user's submission and approve or reject it.
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="max-h-[60vh] pr-4">
                        <div className="grid gap-4 py-4">
                            <div className="font-semibold">Question:</div>
                            <p className="text-sm bg-muted p-3 rounded-md">{task.question}</p>
                            <div className="font-semibold">User Answer:</div>
                            <p className="text-sm bg-muted p-3 rounded-md">{task.answer}</p>
                            <div className="font-semibold">AI Summary:</div>
                            {loadingSummary ? (
                                <div className="flex items-center space-x-2">
                                    <Loader2 className="h-4 w-4 animate-spin"/>
                                    <span>Generating summary...</span>
                                </div>
                            ) : (
                                <p className="text-sm bg-muted p-3 rounded-md italic">{summary || 'Click "View" to generate summary.'}</p>
                            )}
                        </div>
                      </ScrollArea>
                      <DialogFooter>
                         <DialogClose asChild>
                            <Button
                                variant="outline"
                                onClick={() => handleUpdateStatus(task.id, 'rejected')}
                                disabled={task.status !== 'pending'}
                            >
                                <ThumbsDown className="mr-2 h-4 w-4" /> Reject
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                onClick={() => handleUpdateStatus(task.id, 'approved')}
                                disabled={task.status !== 'pending'}
                            >
                               <ThumbsUp className="mr-2 h-4 w-4" /> Approve
                            </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    );
}

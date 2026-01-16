'use server';

/**
 * @fileOverview Summarizes user-submitted answers for quick review.
 *
 * - summarizeSubmittedTask - A function that summarizes the submitted answers.
 * - SummarizeSubmittedTaskInput - The input type for the summarizeSubmittedTask function.
 * - SummarizeSubmittedTaskOutput - The return type for the summarizeSubmittedTask function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSubmittedTaskInputSchema = z.object({
  answers: z.string().describe('The answers submitted by the user.'),
});
export type SummarizeSubmittedTaskInput = z.infer<typeof SummarizeSubmittedTaskInputSchema>;

const SummarizeSubmittedTaskOutputSchema = z.object({
  summary: z.string().describe('A summary of the submitted answers.'),
});
export type SummarizeSubmittedTaskOutput = z.infer<typeof SummarizeSubmittedTaskOutputSchema>;

export async function summarizeSubmittedTask(input: SummarizeSubmittedTaskInput): Promise<SummarizeSubmittedTaskOutput> {
  return summarizeSubmittedTaskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSubmittedTaskPrompt',
  input: {schema: SummarizeSubmittedTaskInputSchema},
  output: {schema: SummarizeSubmittedTaskOutputSchema},
  prompt: `You are an AI assistant that summarizes user-submitted answers for review.

  Answers: {{{answers}}}

  Please provide a concise summary of the answers.`,
});

const summarizeSubmittedTaskFlow = ai.defineFlow(
  {
    name: 'summarizeSubmittedTaskFlow',
    inputSchema: SummarizeSubmittedTaskInputSchema,
    outputSchema: SummarizeSubmittedTaskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

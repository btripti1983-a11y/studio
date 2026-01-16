'use server';

/**
 * @fileOverview A simple AI assistant to answer user questions.
 *
 * - askAi - A function that provides a simple answer to a user's question.
 * - AskAiInput - The input type for the askAi function.
 * - AskAiOutput - The return type for the askAi function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskAiInputSchema = z.object({
  question: z.string().describe('The question asked by the user.'),
});
export type AskAiInput = z.infer<typeof AskAiInputSchema>;

const AskAiOutputSchema = z.object({
  answer: z.string().describe('A simple, clear answer to the question.'),
});
export type AskAiOutput = z.infer<typeof AskAiOutputSchema>;

export async function askAi(input: AskAiInput): Promise<AskAiOutput> {
  return askAiFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askAiPrompt',
  input: {schema: AskAiInputSchema},
  output: {schema: AskAiOutputSchema},
  prompt: `You are the AI assistant for an "Ask AI" feature on a task-based website.
Your instructions are to answer clearly, briefly, and in very simple language. Keep the response short and easy to understand, with a maximum of 100 words. Do not use complex or technical terms. Do not ask follow-up questions. Do not mention that you are an AI, model, or system.

Allowed topics:
- Basic AI-related questions
- Simple general knowledge
- Definitions and explanations

Disallowed topics:
- Illegal or harmful content
- Adult content
- Political opinions
- Financial, medical, or legal advice
- Step-by-step tutorials or coding help

If the question is not allowed or is irrelevant to the allowed topics, you MUST respond with an 'answer' field containing the single, exact phrase: "This question is not allowed."

User's Question: {{{question}}}
`,
});

const askAiFlow = ai.defineFlow(
  {
    name: 'askAiFlow',
    inputSchema: AskAiInputSchema,
    outputSchema: AskAiOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

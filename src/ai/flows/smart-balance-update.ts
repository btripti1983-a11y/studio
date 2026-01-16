'use server';

/**
 * @fileOverview Determines whether the balance needs to be updated and updates the user balance.
 *
 * - smartBalanceUpdate - A function that handles the balance update process.
 * - SmartBalanceUpdateInput - The input type for the smartBalanceUpdate function.
 * - SmartBalanceUpdateOutput - The return type for the smartBalanceUpdate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartBalanceUpdateInputSchema = z.object({
  currentBalance: z.number().describe('The current balance of the user.'),
  proposedBalance: z.string().describe('The balance proposed by the user.'),
});
export type SmartBalanceUpdateInput = z.infer<typeof SmartBalanceUpdateInputSchema>;

const SmartBalanceUpdateOutputSchema = z.object({
  shouldUpdate: z.boolean().describe('Whether the balance should be updated.'),
  updatedBalance: z.number().optional().describe('The updated balance if shouldUpdate is true.'),
  reason: z.string().describe('The reason for the decision.'),
});
export type SmartBalanceUpdateOutput = z.infer<typeof SmartBalanceUpdateOutputSchema>;

export async function smartBalanceUpdate(input: SmartBalanceUpdateInput): Promise<SmartBalanceUpdateOutput> {
  return smartBalanceUpdateFlow(input);
}

const smartBalanceUpdatePrompt = ai.definePrompt({
  name: 'smartBalanceUpdatePrompt',
  input: {schema: SmartBalanceUpdateInputSchema},
  output: {schema: SmartBalanceUpdateOutputSchema},
  prompt: `You are an expert system for determining whether a user's balance should be updated.

  The current balance is: {{{currentBalance}}}
  The user has proposed a new balance: {{{proposedBalance}}}

  Analyze the proposed balance and determine if it is valid and should be updated.
  Consider whether the proposed balance is a valid number and if it seems reasonable.
  Explain the reasoning behind your decision in the reason field.

  Your response MUST be in JSON format. If shouldUpdate is true, updatedBalance MUST be a number.
  If shouldUpdate is false, updatedBalance MUST NOT be set.
  Example when the proposed balance should be accepted:
  {
    "shouldUpdate": true,
    "updatedBalance": 123.45,
    "reason": "The proposed balance is a valid number and represents a reasonable update."
  }

  Example when the proposed balance should be rejected:
  {
    "shouldUpdate": false,
    "reason": "The proposed balance is not a valid number."
  }
`,
});

const smartBalanceUpdateFlow = ai.defineFlow(
  {
    name: 'smartBalanceUpdateFlow',
    inputSchema: SmartBalanceUpdateInputSchema,
    outputSchema: SmartBalanceUpdateOutputSchema,
  },
  async input => {
    try {
      const {output} = await smartBalanceUpdatePrompt(input);
      // Attempt to parse the proposed balance as a number
      const proposedBalanceNumber = parseFloat(input.proposedBalance);

      if (isNaN(proposedBalanceNumber)) {
        return {
          shouldUpdate: false,
          reason: 'The proposed balance is not a valid number.',
        };
      }
      
      // Additional validation logic can be added here, for example:
      // - Check if the proposed balance is within a reasonable range
      // - Check if the proposed balance is significantly different from the current balance

      // If the LLM suggests an update but doesn't provide a valid number, override the decision
      if (output?.shouldUpdate && typeof output?.updatedBalance !== 'number') {
        return {
          shouldUpdate: false,
          reason: 'The LLM suggested an update but did not provide a valid updated balance.',
        };
      }

      return output!;
    } catch (error: any) {
      console.error('Error in smartBalanceUpdateFlow:', error);
      return {
        shouldUpdate: false,
        reason: `An error occurred while processing the balance update: ${error.message}`,
      };
    }
  }
);

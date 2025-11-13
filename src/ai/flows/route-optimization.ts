'use server';
/**
 * @fileOverview Planejamento de passeios para clientes.
 *
 * Este arquivo define um fluxo Genkit que recebe detalhes do passeio como entrada e retorna sugestões de roteiro,
 * custos estimados e duração usando uma ferramenta de IA.
 *
 * @exports planTour - A função principal para acionar o fluxo de planejamento de passeios.
 * @exports TourPlanningInput - O tipo de entrada para a função planTour.
 * @exports TourPlanningOutput - O tipo de saída para a função planTour.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TourPlanningInputSchema = z.object({
  destination: z.string().describe('O destino desejado para o passeio.'),
  passengers: z.coerce.number().positive('O número de passageiros.'),
  interests: z.string().describe('Interesses do grupo (ex: cultural, gastronômico, aventura).'),
});
export type TourPlanningInput = z.infer<typeof TourPlanningInputSchema>;

const TourPlanningOutputSchema = z.object({
  suggestedItinerary: z.string().describe('Um roteiro sugerido para o passeio.'),
  estimatedCost: z.number().describe('O custo estimado do passeio em BRL.'),
  tourDuration: z.string().describe('A duração estimada do passeio (ex: 4 horas, dia inteiro).'),
});
export type TourPlanningOutput = z.infer<typeof TourPlanningOutputSchema>;

export async function optimizeRoute(input: TourPlanningInput): Promise<TourPlanningOutput> {
  return tourPlanningFlow(input);
}

const tourPlanningPrompt = ai.definePrompt({
  name: 'tourPlanningPrompt',
  input: {schema: TourPlanningInputSchema},
  output: {schema: TourPlanningOutputSchema},
  prompt: `Você é uma IA especialista em criar roteiros turísticos. Com base nos detalhes fornecidos, crie um roteiro, estime o custo e a duração do passeio.

Destino: {{{destination}}}
Número de Passageiros: {{{passengers}}}
Interesses: {{{interests}}}

Crie um roteiro otimizado, estime o custo em BRL (Reais) e sugira uma duração para o passeio com base nesses detalhes.`,
});

const tourPlanningFlow = ai.defineFlow(
  {
    name: 'tourPlanningFlow',
    inputSchema: TourPlanningInputSchema,
    outputSchema: TourPlanningOutputSchema,
  },
  async input => {
    const {output} = await tourPlanningPrompt(input);
    return output!;
  }
);

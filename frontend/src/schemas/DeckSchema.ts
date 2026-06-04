import { z } from "zod"

export const DeckSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  cardCount: z.number(),
  dueCount: z.number(),
  learnedCount: z.number(),
  newCardsLimit: z.number().default(20).optional()
})

export type Deck = z.infer<typeof DeckSchema>

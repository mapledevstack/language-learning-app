import { z } from "zod"

const defaultSrsSettings = {
  newCardsLimit: 20,
  startingEase: 2.5,
  steps: [1, 10],
  graduatingInterval: 1,

  easePenalty: 0.2,
  easeBonus: 0.15,
  minEase: 1.2,
}

export const DeckSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),

  cardCount: z.number(),
  dueCount: z.number(),
  learnedCount: z.number().default(0),
  
  
  srsSettings: z.object({
    newCardsLimit: z.number(),
    startingEase: z.number(),
    steps: z.array(z.number()),
    graduatingInterval: z.number(),

    easePenalty: z.number(),
    easeBonus: z.number(),
    minEase: z.number()
  }).default(defaultSrsSettings)
})

export type Deck = z.infer<typeof DeckSchema>

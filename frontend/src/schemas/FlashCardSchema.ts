import { z } from "zod"

export const FlashCardSchema = z.object({
  id: z.number(),
  deckId: z.number(),
  
  front: z.object({
    expression: z.string()
  }),
  back: z.object({
    reading: z.string(),
    meaning: z.string(),
    image: z.string().optional(),
    source: z.string().optional()
  }),

  dueDate: z.date().nullable(),
  lastReviewed: z.date().nullable(),
  interval: z.number().default(0),

  status: z.enum(["new", "learning", "mature"]).default("new")
})

export type FlashCard = z.infer<typeof FlashCardSchema>

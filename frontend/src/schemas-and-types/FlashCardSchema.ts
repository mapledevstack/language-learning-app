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

  status: z.enum(["new", "learning", "review"]).default("new"),
  interval: z.number().default(0),
  learningStep: z.number().default(0),
  ease: z.number().default(2.5),
  dueDate: z.date()
})

export type FlashCard = z.infer<typeof FlashCardSchema>

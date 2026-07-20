import { z } from "zod"

export const FlashCardSchema = z.object({
  id: z.number(),
  deckId: z.array(z.number()).default([]),

  front: z.object({
    expression: z.string(),
  }),
  back: z.object({
    reading: z.string(),
    meaning: z.string(),
    image: z.string().optional(),
    source: z.string().optional(),
  }),

  status: z.enum(["new", "learning", "review"]).default("new"),
  interval: z.number().default(0),
  learningStep: z.number().default(0),
  ease: z.number().default(2.5),
  dueDate: z.date(),
})

export const createFlashCardSchema = z.object({
  wordId: z.string(),
  deckId: z.string(),
  front: z.object({
    text: z.string().min(1),
    media: z
      .object({
        image: z.string().nullable().optional(),
        audio: z.string().nullable().optional(),
      })
      .optional(),
  }),

  source: z.string().default("dictionary"),
  userNotes: z.string().nullable(),
})

export type CreateFlashCardSchema = z.infer<typeof createFlashCardSchema>

export type FlashCard = z.infer<typeof FlashCardSchema>

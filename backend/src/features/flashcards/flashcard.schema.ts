import { z } from "zod"

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

  source: z.string().optional(),

  userNotes: z.string().optional(),
})

export type CreateFlashCardSchema = z.infer<typeof createFlashCardSchema>

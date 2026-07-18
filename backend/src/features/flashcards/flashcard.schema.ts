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

export const getFlashCardsParamsSchema = z.object({
  deckId: z.string(),
})

export const deleteFlashCardParamsSchema = z.object({
  flashcardId: z.string(),
})

export const updateFlashCardParamsSchema = z.object({
  flashcardId: z.string(),
})

export const updateFlashCardSchema = createFlashCardSchema
  .pick({
    front: true,
    source: true,
    userNotes: true,
  })
  .partial()

export const getDueFlashCardsSchema = z.object({
  deckId: z.string(),
})

export type CreateFlashCardSchema = z.infer<typeof createFlashCardSchema>

export type UpdateFlashCardSchema = z.infer<typeof updateFlashCardSchema>

import { z } from "zod"

export const FsrsSchema = z.object({
  due: z.iso.datetime(),
  stability: z.number(),
  difficulty: z.number(),
  scheduled_days: z.number(),
  learning_steps: z.number(),
  reps: z.number(),
  lapses: z.number(),
  state: z.number(),
  last_review: z.string().datetime().nullable(),
  elapsed_days: z.number(),
})

export const FlashCardSchema = z.object({
  _id: z.string(),

  userId: z.string(),
  wordId: z.string(),
  deckId: z.string(),

  front: z.object({
    text: z.string(),

    media: z
      .object({
        image: z.string().nullish(),
        audio: z.string().nullish(),
        video: z.string().nullish(),
      })
      .nullish(),
  }),

  source: z.string(),
  userNotes: z.string(),

  fsrs: FsrsSchema,

  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})

export const FlashCardsSchema = z.array(FlashCardSchema)

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

export const updateFlashCardSchema = z.object({
  front: z.object({
    text: z.string(),
  }),
  source: z.string(),
  userNotes: z.string(),
})

export type FlashCard = z.infer<typeof FlashCardSchema>
export type FlashCards = z.infer<typeof FlashCardsSchema>
export type CreateFlashCardSchema = z.infer<typeof createFlashCardSchema>
export type UpdateFlashCardSchema = z.infer<typeof updateFlashCardSchema>

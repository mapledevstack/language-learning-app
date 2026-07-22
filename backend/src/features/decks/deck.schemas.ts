import { z } from "zod"

export const createDeckSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().optional().default(""),
})

export const deckParamsSchema = z.object({
  deckId: z.string(),
})

export const updateDeckSchema = z.object({
  title: z.string().trim().min(1).max(100).optional(),
  description: z.string().trim().max(500).optional(),
})

export const deckStatsSchema = z.object({
  totalCards: z.number(),
  newCards: z.number(),
  learningCards: z.number(),
  reviewCards: z.number(),
  relearningCards: z.number(),
  dueCards: z.number(),
})

export type CreateDeckSchema = z.infer<typeof createDeckSchema>
export type DeckParamsSchema = z.infer<typeof deckParamsSchema>
export type UpdateDeckSchema = z.infer<typeof updateDeckSchema>
export type DeckStatsSchema = z.infer<typeof deckStatsSchema>

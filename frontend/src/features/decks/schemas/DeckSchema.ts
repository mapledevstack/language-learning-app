import { z } from "zod"

export const DeckSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
})

export const DecksSchema = z.array(DeckSchema)

export const createDeckInput = DeckSchema.pick({
  title: true,
  description: true,
})

export const updateDeckInput = createDeckInput.partial()

export type Deck = z.infer<typeof DeckSchema>
export type CreateDeckInput = z.infer<typeof createDeckInput>
export type UpdateDeckInput = z.infer<typeof updateDeckInput>

import { z } from "zod"

export const searchByIdParams = z.object({
  wordId: z.string(),
})

export const searchQuerySchema = z.object({
  q: z.string().trim().min(1),
  limit: z.coerce.number().int().min(1).max(100).default(30),
})

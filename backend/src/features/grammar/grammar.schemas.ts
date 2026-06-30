import z from "zod"

export const searchGrammarSchema = z.object({
  q: z.string().trim().min(1, "Search query is required"),
  limit: z.coerce.number().int().positive().max(20).default(10),
})

import z from "zod"

export const GrammarResourceSchema = z.object({
  _id: z.string(),
  title: z.string(),
  section: z.string(),
  source: z.string(),
  sourceUrl: z.string(),
  score: z.number(),
})

export type GrammarResourceType = z.infer<typeof GrammarResourceSchema>

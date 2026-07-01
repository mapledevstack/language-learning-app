import z from "zod"

export const GrammarResourceSchema = z.object({
  _id: z.string(),
  topic: z.string(),
  section: z.string(),
  source: z.string(),
  sourceUrl: z.string(),
})

export type GrammarResource = z.infer<typeof GrammarResourceSchema>

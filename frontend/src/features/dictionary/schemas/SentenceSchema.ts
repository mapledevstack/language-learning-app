import z from "zod"

export const SentenceSchema = z.object({
  japanese: z.string(),
  english: z.string().nullable().optional(),
})

export const SentencesSchema = z.array(SentenceSchema)

export type Sentence = z.infer<typeof SentenceSchema>

import { z } from "zod"

export const FuriganaSchema = z.object({
  text: z.string(),
  reading: z.string().nullable(),
})

export const WordFormSchema = z.object({
  text: z.string(),
  reading: z.string(),

  furigana: z.array(FuriganaSchema),

  common: z.boolean(),

  tags: z.array(z.string()),

  pitchAccent: z.string().nullable(),
})

export const MeaningSchema = z.object({
  definitions: z.array(z.string()),

  partsOfSpeech: z.array(z.string()),

  tags: z.array(z.string()),

  notes: z.array(z.string()),
})

export const WordSchema = z.object({
  wordId: z.string(),

  forms: z.array(WordFormSchema),

  meanings: z.array(MeaningSchema),
})

export const WordsSchema = z.array(WordSchema)

export type WordForm = z.infer<typeof WordFormSchema>
export type Word = z.infer<typeof WordSchema>

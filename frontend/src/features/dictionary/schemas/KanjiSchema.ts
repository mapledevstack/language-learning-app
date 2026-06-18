import { z } from "zod"

export const KanjiSchema = z.object({
  _id: z.string(),
  kanji: z.string(),

  meanings: z.array(z.string()),
  onReadings: z.array(z.string()),
  kunReadings: z.array(z.string()),
  strokeCount: z.number(),
  grade: z.number().nullable(),
  jlpt: z.enum(["N1", "N2", "N3", "N4", "N5"]).nullable(),
  frequency: z.number().nullable(),
  notes: z.array(z.string()),
})

export type Kanji = z.infer<typeof KanjiSchema>

import { z } from "zod"

export const WordSchema = z.object({
  id: z.number(),
  spellings: z.array(z.string()),
  readings: z.array(z.string()),
  meanings: z.array(z.string()),
  partsOfSpeech: z.array(z.string()),
  jlpt: z.string()
})

export type Word = z.infer<typeof WordSchema>

import { z } from "zod"

const SubtitleTokenSchema = z.object({
  text: z.string(),
  baseForm: z.string(),
})

export const SubtitleSchema = z.object({
  text: z.string(),
  offset: z.number(),
  duration: z.number(),
  tokens: z.array(SubtitleTokenSchema),
})

export const SubtitlesSchema = z.array(SubtitleSchema)

export type Subtitles = z.infer<typeof SubtitlesSchema>

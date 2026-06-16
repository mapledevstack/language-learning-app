import { z } from "zod"

export const TokenSchema = z.object({
  text: z.string(),
  baseForm: z.string(),
})

export const SubtitleSchema = z.object({
  text: z.string(),
  duration: z.number(),
  offset: z.number(),

  tokens: z.array(TokenSchema),
})

export const SubtitlesSchema = z.array(SubtitleSchema)

export type Token = z.infer<typeof TokenSchema>
export type Subtitle = z.infer<typeof SubtitleSchema>
export type Subtitles = z.infer<typeof SubtitlesSchema>

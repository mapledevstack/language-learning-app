import { z } from "zod"

export const SubtitlesSchema = z.array(
  z.object({
    text: z.string(),
    duration: z.number(),
    offset: z.number(),
    lang: z.literal("ja"),
  }),
)

export type Subtitles = z.infer<typeof SubtitlesSchema>

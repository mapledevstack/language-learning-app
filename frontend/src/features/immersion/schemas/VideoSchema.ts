import { z } from "zod"

export const VideoSchema = z.object({
  vidId: z.string(),
  title: z.string(),
  channelTitle: z.string(),
})

export const VideosSchema = z.array(VideoSchema)

export type Video = z.infer<typeof VideoSchema>
export type Videos = z.infer<typeof VideosSchema>

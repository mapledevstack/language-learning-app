import { z } from "zod"

export const VideoSchema = z.object({
  vidId: z.string(),
  title: z.string(),
})

export const VideosSchema = z.array(VideoSchema)

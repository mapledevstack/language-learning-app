import z from "zod"

export const createTopicSchema = z.object({
  name: z.string().trim().min(1, "Topic name is required"),
  coverImg: z.string().nullable(),
})

export const topicParamsSchema = z.object({
  topicId: z.string().min(1),
})

export const videoParamsSchema = z.object({
  vidId: z.string().min(1),
})

export const youtubeSearchResponseSchema = z.object({
  items: z.array(
    z.object({
      id: z.object({
        videoId: z.string(),
      }),
      snippet: z.object({
        title: z.string(),
      }),
    }),
  ),
})

export type VideoResult = {
  vidId: string
  title: string
}

export const updateUserVideoSchema = z
  .object({
    isFavorited: z.boolean().optional(),
    isWatchLater: z.boolean().optional(),
  })
  .refine(
    (data) => data.isFavorited !== undefined || data.isWatchLater !== undefined,
    { message: "At least one field is required" },
  )

export const userVideoListSchema = z.object({
  list: z.enum(["favorites", "watch-later"]),
})

export type YoutubeSearchResponse = z.infer<typeof youtubeSearchResponseSchema>
export type UpdateUserVideo = z.infer<typeof updateUserVideoSchema>
export type UserVideoList = z.infer<typeof userVideoListSchema>

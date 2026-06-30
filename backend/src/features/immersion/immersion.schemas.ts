import z from "zod"

const TopicTypes = ["default", "custom", "watch_later", "history"] as const

export const createTopicSchema = z.object({
  name: z.string().trim().min(1, "Topic name is required"),
  coverImg: z.string().nullable(),
  type: z.enum(TopicTypes).optional(),
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

export type TopicType = z.infer<typeof createTopicSchema>["type"]
export type YoutubeSearchResponse = z.infer<typeof youtubeSearchResponseSchema>

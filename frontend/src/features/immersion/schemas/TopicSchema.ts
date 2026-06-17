import { z } from "zod"

export const TopicSchema = z.object({
  _id: z.string(),
  name: z.string(),
  type: z.enum(["default", "custom", "watch_later", "history"]),
  coverImg: z.string().nullable(),
  vidCount: z.number(),
})

export const TopicsSchema = z.array(TopicSchema)

export type Topic = z.infer<typeof TopicSchema>
export type Topics = z.infer<typeof TopicsSchema>

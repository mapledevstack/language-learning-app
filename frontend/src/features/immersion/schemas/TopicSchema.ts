import { z } from "zod"

export const TopicSchema = z.object({
  _id: z.string(),
  name: z.string(),
  coverImg: z.string().nullable(),
  vidCount: z.number(),
})

export const TopicsSchema = z.array(TopicSchema)

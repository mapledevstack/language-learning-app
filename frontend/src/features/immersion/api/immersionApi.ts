import { TopicsSchema } from "../schemas/TopicSchema"
import { VideosSchema } from "../schemas/VideoSchema"

export const getTopics = async () => {
  const res = await fetch(`http://localhost:3000/api/v1/immersion/topics`)

  if (!res.ok) {
    throw new Error("failed to fetch topics")
  }

  const data = await res.json()

  return TopicsSchema.parse(data)
}

export const getTopicVideos = async (topicId: string) => {
  const res = await fetch(
    `http://localhost:3000/api/v1/immersion/topics/${topicId}/videos`,
  )

  if (!res.ok) {
    throw new Error("failed to fetch videos")
  }

  const data = await res.json()

  return VideosSchema.parse(data)
}

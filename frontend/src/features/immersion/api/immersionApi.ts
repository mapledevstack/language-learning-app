import type { Subtitles } from "@/schemas/SubtitlesSchema"
import { TopicsSchema } from "../schemas/TopicSchema"
import { VideosSchema } from "../schemas/VideoSchema"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getTopics = async () => {
  const res = await fetch(`${API_BASE_URL}/immersion/topics`)

  if (!res.ok) {
    throw new Error("failed to fetch topics")
  }

  const data = await res.json()

  return TopicsSchema.parse(data)
}

export const getTopicVideos = async (topicId: string) => {
  const res = await fetch(`${API_BASE_URL}/immersion/topics/${topicId}/videos`)

  if (!res.ok) {
    throw new Error("failed to fetch videos")
  }

  const data = await res.json()

  return VideosSchema.parse(data)
}

export const getSubtitles = async (vidId: string) => {
  const res = await fetch(`${API_BASE_URL}/immersion/videos/${vidId}/subtitles`)

  if (!res.ok) {
    throw new Error("failed to fetch subtitles")
  }

  const data: Subtitles = await res.json()

  return data
}

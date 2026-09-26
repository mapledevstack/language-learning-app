import api from "@/utils/api"

import { SubtitlesSchema } from "../schemas/SubtitlesSchema"
import { TopicSchema, TopicsSchema } from "../schemas/TopicSchema"
import { VideosSchema } from "../schemas/VideoSchema"
import { UserVideoSchema } from "../schemas/UserVideoSchema"

export const getTopics = async () => {
  const data = await api.get("/immersion/topics")

  return TopicsSchema.parse(data)
}

export const createTopic = async (body: {
  name: string
  coverImg: string | null
}) => {
  const data = await api.post("/immersion/topics", body)

  return TopicSchema.parse(data)
}

export const deleteTopic = async (topicId: string) => {
  await api.delete(`/immersion/topics/${topicId}`)
}

export const getTopicVideos = async (topicId: string) => {
  const data = await api.get(`/immersion/topics/${topicId}/videos`)

  return VideosSchema.parse(data)
}

export const getSubtitles = async (vidId: string) => {
  const data = await api.get(`/immersion/videos/${vidId}/subtitles`)

  return SubtitlesSchema.parse(data)
}

export const getUserVideos = async (list: "favorites" | "watch-later") => {
  const data = await api.get(`/immersion/videos/${list}`)

  return VideosSchema.parse(data)
}

export const updateUserVideo = async (
  vidId: string,
  body: {
    isFavorited?: boolean
    isWatchLater?: boolean
  },
) => {
  const data = await api.patch(`/immersion/videos/${vidId}`, body)

  return UserVideoSchema.parse(data)
}

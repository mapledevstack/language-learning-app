import { fetchTranscript } from "youtube-transcript"
import "dotenv/config"
import { Topic, Video } from "./immersion.model.js"
import {
  TopicType,
  VideoResult,
  YoutubeSearchResponse,
} from "./immersion.types.js"
import { Types } from "mongoose"

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

const fetchYoutubeVideos = async (topic: string) => {
  const params = new URLSearchParams({
    maxResults: "50",
    type: "video",
    part: "snippet",
    regionCode: "JP",
    relevanceLanguage: "ja",
    videoEmbeddable: "true",
    safeSearch: "none",
    videoCaptions: "closedCaption",
    videoDuration: "medium",
    q: `${topic}日本語で`,
    key: YOUTUBE_API_KEY!,
  })
  const url = `https://content-youtube.googleapis.com/youtube/v3/search?${params}`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Youtube API returned ${res.status}`)
  }

  const data: YoutubeSearchResponse = await res.json()

  const videos = data.items.map((item) => ({
    vidId: item.id.videoId,
    title: item.snippet.title,
  }))

  return videos
}

const cacheVideos = async (topicId: Types.ObjectId, videos: VideoResult[]) => {
  for (const video of videos) {
    await Video.updateOne(
      { vidId: video.vidId },
      { $set: video },
      { upsert: true },
    )
  }

  await Topic.findByIdAndUpdate(topicId, {
    $set: {
      vidIds: videos.map((video) => video.vidId),
    },
  })
}

export const getAllTopics = async () => {
  const topics = await Topic.find(
    {},
    {
      name: 1,
      type: 1,
      coverImg: 1,
    },
  )

  return topics
}

export const createTopic = async (
  name: string,
  coverImg: string,
  type: TopicType,
) => {
  const topic = await Topic.create({
    name,
    coverImg,
    type,
  })

  const videos = await fetchYoutubeVideos(name)
  await cacheVideos(topic._id, videos)

  return await Topic.findById(topic._id)
}

export const deleteTopic = async (topicId: string) => {
  const topic = await Topic.findByIdAndDelete(topicId)

  if (!topic) {
    throw new Error("topic not found")
  }
}

export const getTopicVideos = async (topicId: string) => {
  const topic = await Topic.findById(topicId)

  if (!topic) {
    throw new Error("topic not found")
  }

  const videos = Video.find({
    vidId: { $in: topic.vidIds },
  })

  return videos
}

export const getSubtitles = async (vidId: string) => {
  const subtitles = await fetchTranscript(vidId, { lang: "ja" })

  return subtitles
}

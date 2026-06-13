import { fetchTranscript } from "youtube-transcript"
import "dotenv/config"
import { Topic, Video } from "./immersion.model.js"
import { VideoResult, YoutubeSearchResponse } from "./immersion.types.js"

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

const getCachedVideos = async (topic: string) => {
  const cachedTopic = await Topic.findOne({ name: topic })

  if (!cachedTopic || cachedTopic.vidIds.length === 0) {
    return null
  }

  return await Video.find({
    vidId: { $in: cachedTopic.vidIds },
  }).limit(50)
}

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
    channelTitle: item.snippet.channelTitle,
  }))

  return videos
}

const cacheVideos = async (topic: string, videos: VideoResult[]) => {
  for (const video of videos) {
    await Video.updateOne(
      { vidId: video.vidId },
      { $set: video },
      { upsert: true },
    )
  }

  await Topic.updateOne(
    { name: topic },
    {
      $set: {
        name: topic,
        type: "default",
        vidIds: videos.map((video) => video.vidId),
      },
    },
    { upsert: true },
  )
}

export const getVideos = async (query: string) => {
  const topic = query.trim().toLocaleLowerCase()

  const cachedVideos = await getCachedVideos(topic)

  if (cachedVideos) {
    return cachedVideos
  }

  const videos = await fetchYoutubeVideos(topic)

  cacheVideos(topic, videos)

  return videos
}

export const getSubtitles = async (vidId: string) => {
  const subtitles = await fetchTranscript(vidId, { lang: "ja" })

  return subtitles
}

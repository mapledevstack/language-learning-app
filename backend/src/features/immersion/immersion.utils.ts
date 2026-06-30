import { Types } from "mongoose"
import { YOUTUBE_API_KEY } from "../../constants/env.js"
import { BAD_GATEWAY } from "../../constants/http.js"
import AppError from "../../utils/appError.js"
import { Topic, Video } from "./immersion.model.js"
import { getSubtitles } from "./immersion.service.js"
import {
  VideoResult,
  YoutubeSearchResponse,
  youtubeSearchResponseSchema,
} from "./immersion.schemas.js"

export const fetchYoutubeVideos = async (
  topic: string,
): Promise<VideoResult[]> => {
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
    q: `${topic} 日本語`,
    key: YOUTUBE_API_KEY,
  })

  const url = `https://content-youtube.googleapis.com/youtube/v3/search?${params}`

  const res = await fetch(url)

  if (!res.ok) {
    throw new AppError(`YouTube API returned ${res.status}`, BAD_GATEWAY)
  }

  const data = youtubeSearchResponseSchema.parse(await res.json())

  return data.items.map((item) => ({
    vidId: item.id.videoId,
    title: item.snippet.title,
  }))
}

export const cacheVideos = async (
  topicId: Types.ObjectId,
  videos: VideoResult[],
) => {
  if (!videos.length) return

  await Video.bulkWrite(
    videos.map((video) => ({
      updateOne: {
        filter: { vidId: video.vidId },
        update: { $set: video },
        upsert: true,
      },
    })),
  )

  await Topic.findByIdAndUpdate(topicId, {
    $addToSet: {
      vidIds: {
        $each: videos.map((video) => video.vidId),
      },
    },
  })
}

export const hasJpSubtitles = async (vidId: string) => {
  try {
    await getSubtitles(vidId)
    return true
  } catch {
    return false
  }
}

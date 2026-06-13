import { fetchTranscript } from "youtube-transcript"
import "dotenv/config"

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

export const getVideos = async (query: string) => {
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
    q: query,
    key: YOUTUBE_API_KEY!,
  })
  const url = `https://content-youtube.googleapis.com/youtube/v3/search?${params}`

  const res = await fetch(url)
  const data: YoutubeSearchResponse = await res.json()

  const videos = data.items.map((item) => ({
    vidId: item.id.videoId,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
  }))

  return videos
}

export const getSubtitles = async (vidId: string) => {
  const subtitles = await fetchTranscript(vidId, { lang: "ja" })

  return subtitles
}

type YoutubeSearchResponse = {
  items: {
    id: {
      videoId: string
    }
    snippet: {
      title: string
      channelTitle: string
    }
  }[]
}

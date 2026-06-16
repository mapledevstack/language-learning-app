import { fetchTranscript } from "youtube-transcript"
import "dotenv/config"
import { Subtitle, Topic, Video } from "./immersion.model.js"
import {
  TopicType,
  VideoResult,
  YoutubeSearchResponse,
} from "./immersion.types.js"
import { Types } from "mongoose"
import kuromoji, { IpadicFeatures, Tokenizer } from "kuromoji"

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
    $addToSet: {
      vidIds: {
        $each: videos.map((video) => video.vidId),
      },
    },
  })
}

let tokenizer: kuromoji.Tokenizer<kuromoji.IpadicFeatures> | null = null

const getTokenizer = async () => {
  if (tokenizer) return tokenizer

  tokenizer = await new Promise<Tokenizer<IpadicFeatures>>(
    (resolve, reject) => {
      kuromoji
        .builder({ dicPath: "node_modules/kuromoji/dict" })
        .build((err, tokenizer) => {
          if (err) reject(err)
          else resolve(tokenizer)
        })
    },
  )
  return tokenizer
}

const hasJpSubtitles = async (vidId: string) => {
  try {
    await getSubtitles(vidId)
    return true
  } catch {
    return false
  }
}

export const getAllTopics = async () => {
  const topics = await Topic.aggregate([
    {
      $project: {
        name: 1,
        type: 1,
        coverImg: 1,

        vidCount: {
          $size: "$vidIds",
        },
      },
    },
  ])

  return topics
}

export const createTopic = async (
  name: string,
  coverImg: string | null,
  type: TopicType,
) => {
  const topic = await Topic.findOneAndUpdate(
    { name },
    {
      name,
      coverImg,
      type,
    },
    {
      upsert: true,
      returnDocument: "after",
    },
  )

  const videos = await fetchYoutubeVideos(name)
  const filteredVideos = []

  for (const video of videos) {
    if (await hasJpSubtitles(video.vidId)) {
      filteredVideos.push(video)
    }
  }

  await cacheVideos(topic._id, filteredVideos)

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
  const cachedSubtitles = await Subtitle.findOne({ vidId: vidId })

  if (cachedSubtitles) {
    return cachedSubtitles.subtitles
  }

  const rawSubtitles = await fetchTranscript(vidId, { lang: "ja" })
  const tokenizer = await getTokenizer()

  const subtitles = rawSubtitles.map((sub) => ({
    text: sub.text,
    offset: sub.offset,
    duration: sub.duration,

    tokens: tokenizer.tokenize(sub.text).map((token) => ({
      text: token.surface_form,
      baseForm:
        token.basic_form && token.basic_form !== "*"
          ? token.basic_form
          : token.surface_form,
    })),
  }))

  await Subtitle.create({ vidId, subtitles })

  return subtitles
}

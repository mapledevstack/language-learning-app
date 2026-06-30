import { fetchTranscript } from "youtube-transcript"
import { Subtitle, Topic, Video } from "./immersion.model.js"
import { TopicType, VideoResult } from "./immersion.schemas.js"
import AppError from "../../utils/appError.js"
import { BAD_GATEWAY, NOT_FOUND } from "../../constants/http.js"
import {
  cacheVideos,
  fetchYoutubeVideos,
  hasJpSubtitles,
} from "./immersion.utils.js"
import { getTokenizer } from "../../config/tokenizer.js"

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

  if (!topic) {
    throw new AppError("Could not create topic", BAD_GATEWAY)
  }

  const videos = await fetchYoutubeVideos(name)
  const filteredVideos: VideoResult[] = []

  for (const video of videos) {
    if (await hasJpSubtitles(video.vidId)) {
      filteredVideos.push(video)
    }
  }

  await cacheVideos(topic._id, filteredVideos)

  return Topic.findById(topic._id)
}

export const deleteTopic = async (topicId: string) => {
  const topic = await Topic.findByIdAndDelete(topicId)

  if (!topic) {
    throw new AppError("Topic not found", NOT_FOUND)
  }
}

export const getTopicVideos = async (topicId: string) => {
  const topic = await Topic.findById(topicId).lean()

  if (!topic) {
    throw new AppError("Topic not found", NOT_FOUND)
  }

  const videos = await Video.find({
    vidId: { $in: topic.vidIds },
  }).lean()

  return videos
}

export const getSubtitles = async (vidId: string) => {
  const cachedSubtitles = await Subtitle.findOne({ vidId }).lean()

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

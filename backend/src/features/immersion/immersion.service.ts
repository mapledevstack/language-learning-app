import { fetchTranscript } from "youtube-transcript"
import { Subtitle, Topic, UserVideo, Video } from "./immersion.model.js"
import AppError from "../../utils/appError.js"
import { NOT_FOUND } from "../../constants/http.js"
import { getTokenizer } from "../../config/tokenizer.js"
import { Types } from "mongoose"
import { cacheVideos, fetchYoutubeVideos } from "./immersion.utils.js"
import { UpdateUserVideo } from "./immersion.schemas.js"

export const getAllTopics = async (userId: Types.ObjectId) => {
  return Topic.aggregate([
    {
      $match: {
        $or: [{ userId: null }, { userId }],
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        coverImg: 1,
        vidCount: {
          $size: "$vidIds",
        },
      },
    },
  ])
}

export const createTopic = async (
  userId: Types.ObjectId,
  name: string,
  coverImg: string | null,
) => {
  return Topic.create({
    userId,
    name,
    coverImg,
  })
}

export const deleteTopic = async (topicId: string, userId: Types.ObjectId) => {
  const topic = await Topic.findOneAndDelete({ _id: topicId, userId })

  if (!topic) {
    throw new AppError("Topic not found", NOT_FOUND)
  }
}

export const getTopicVideos = async (
  topicId: string,
  userId: Types.ObjectId,
) => {
  const topic = await Topic.findOne({
    _id: topicId,
    $or: [{ userId: null }, { userId }],
  }).lean()

  if (!topic) {
    throw new AppError("Topic not found", NOT_FOUND)
  }

  if (topic.vidIds.length === 0) {
    const videos = await fetchYoutubeVideos(topic.name)
    await cacheVideos(topic._id, videos)

    return videos
  }

  return Video.find({
    vidId: { $in: topic.vidIds },
  }).lean()
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

export const updateUserVideo = async (
  userId: Types.ObjectId,
  vidId: string,
  updates: UpdateUserVideo,
) => {
  return UserVideo.findOneAndUpdate(
    { userId, vidId },
    { $set: updates },
    {
      upsert: true,
      returnDocument: "after",
      setDefaultsOnInsert: true,
    },
  ).lean()
}

export const getUserVideos = async (
  userId: Types.ObjectId,
  list: "favorites" | "watch-later",
) => {
  const filter =
    list === "favorites" ? { isFavorited: true } : { isWatchLater: true }

  const userVideos = await UserVideo.find({
    userId,
    ...filter,
  }).lean()

  return Video.find({
    vidId: { $in: userVideos.map((userVideo) => userVideo.vidId) },
  }).lean()
}

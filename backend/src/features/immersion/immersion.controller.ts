import { Request, Response } from "express"
import {
  createTopic,
  deleteTopic,
  getAllTopics,
  getSubtitles,
  getTopicVideos,
} from "./immersion.service.js"
import {
  createTopicSchema,
  topicParamsSchema,
  videoParamsSchema,
} from "./immersion.schemas.js"
import { CREATED, NO_CONTENT } from "../../constants/http.js"
import { getAuthUserId } from "../auth/auth.utils.js"

export const getAllTopicsController = async (req: Request, res: Response) => {
  const userId = getAuthUserId(req)

  const topics = await getAllTopics(userId)

  res.json(topics)
}

export const createTopicController = async (req: Request, res: Response) => {
  const userId = getAuthUserId(req)
  const { name, coverImg } = createTopicSchema.parse(req.body)

  const topic = await createTopic(userId, name, coverImg)

  res.status(CREATED).json(topic)
}

export const deleteTopicController = async (
  req: Request<{ topicId: string }>,
  res: Response,
) => {
  const { topicId } = topicParamsSchema.parse(req.params)
  const userId = getAuthUserId(req)

  await deleteTopic(topicId, userId)

  res.sendStatus(NO_CONTENT)
}

export const getTopicVideosController = async (
  req: Request<{ topicId: string }>,
  res: Response,
) => {
  const { topicId } = topicParamsSchema.parse(req.params)
  const userId = getAuthUserId(req)

  const videos = await getTopicVideos(topicId, userId)

  res.json(videos)
}

export const getSubtitlesController = async (
  req: Request<{ vidId: string }>,
  res: Response,
) => {
  const { vidId } = videoParamsSchema.parse(req.params)

  const subtitles = await getSubtitles(vidId)

  res.json(subtitles)
}

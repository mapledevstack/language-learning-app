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

export const getAllTopicsController = async (req: Request, res: Response) => {
  const topics = await getAllTopics()

  res.json(topics)
}

export const createTopicController = async (req: Request, res: Response) => {
  const { name, coverImg, type } = createTopicSchema.parse(req.body)

  const topic = await createTopic(name, coverImg, type)

  res.status(201).json(topic)
}

export const deleteTopicController = async (
  req: Request<{ topicId: string }>,
  res: Response,
) => {
  const { topicId } = topicParamsSchema.parse(req.params)

  await deleteTopic(topicId)

  res.sendStatus(204)
}

export const getTopicVideosController = async (
  req: Request<{ topicId: string }>,
  res: Response,
) => {
  const { topicId } = topicParamsSchema.parse(req.params)

  const videos = await getTopicVideos(topicId)

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

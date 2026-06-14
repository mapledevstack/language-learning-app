import { Request, Response } from "express"
import {
  createTopic,
  deleteTopic,
  getAllTopics,
  getSubtitles,
  getTopicVideos,
} from "./immersion.service.js"

export const getAllTopicsController = async (req: Request, res: Response) => {
  const topics = await getAllTopics()

  res.json(topics)
}

export const createTopicController = async (req: Request, res: Response) => {
  const { name, coverImg, type } = req.body

  if (!name.trim()) {
    throw new Error("topic name is required")
  }

  const topic = await createTopic(name.trim(), coverImg, type)

  res.status(201).json(topic)
}

export const deleteTopicController = async (
  req: Request<{ topicId: string }>,
  res: Response,
) => {
  const topicId = req.params.topicId

  await deleteTopic(topicId)

  res.sendStatus(204)
}

export const getTopicVideosController = async (
  req: Request<{ topicId: string }>,
  res: Response,
) => {
  const topicId = req.params.topicId

  const videos = await getTopicVideos(topicId)

  res.json(videos)
}

export const getSubtitlesController = async (req: Request, res: Response) => {
  const vidId = req.params.vidId

  if (typeof vidId !== "string") {
    throw new Error("Video Id not valid")
  }

  const subtitles = await getSubtitles(vidId)
  res.json(subtitles)
}

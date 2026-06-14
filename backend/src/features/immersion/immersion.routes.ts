import { Router } from "express"
import {
  createTopicController,
  deleteTopicController,
  getAllTopicsController,
  getSubtitlesController,
  getTopicVideosController,
} from "./immersion.controller.js"

const router = Router()

router.get("/topics", getAllTopicsController)
router.post("/topics", createTopicController)
router.delete("/topics/:topicId", deleteTopicController)

router.get("/topics/:topicId/videos", getTopicVideosController)

router.get("/videos/:vidId/subtitles", getSubtitlesController)

export default router

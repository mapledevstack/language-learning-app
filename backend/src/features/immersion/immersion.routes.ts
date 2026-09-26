import { Router } from "express"
import {
  createTopicController,
  deleteTopicController,
  getAllTopicsController,
  getSubtitlesController,
  getTopicVideosController,
  getUserVideosController,
  updateUserVideoController,
} from "./immersion.controller.js"
import requireRealUser from "../../middleware/requireRealUser.js"

const router = Router()

router.get("/topics", getAllTopicsController)
router.post("/topics", requireRealUser, createTopicController)
router.delete("/topics/:topicId", requireRealUser, deleteTopicController)

router.get("/topics/:topicId/videos", getTopicVideosController)

router.get("/videos/:list", getUserVideosController)
router.get("/videos/:vidId/subtitles", getSubtitlesController)
router.patch("/videos/:vidId", requireRealUser, updateUserVideoController)

export default router

import { Router } from "express"
import {
  getSubtitlesController,
  getVideosController,
} from "./immersion.controller.js"

const router = Router()

router.get("/videos", getVideosController)
router.get("/videos/:id/subtitles", getSubtitlesController)

export default router

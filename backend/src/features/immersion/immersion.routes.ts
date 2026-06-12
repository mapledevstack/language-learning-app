import { Router } from "express"
import {
  getSubtitlesController,
  searchVideosController,
} from "./immersion.controller.js"

const router = Router()

router.get("/videos", searchVideosController)
router.get("/videos/:id/subtitles", getSubtitlesController)

export default router

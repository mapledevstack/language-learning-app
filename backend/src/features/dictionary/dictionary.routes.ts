import { Router } from "express"
import {
  getKanjiController,
  getKanjisController,
  getSearchResultsController,
} from "./dictionary.controller.js"

const router = Router()

router.get("/search", getSearchResultsController)

router.get("/kanji", getKanjiController)
router.get("/kanjis", getKanjisController)

export default router

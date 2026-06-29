import { Router } from "express"
import {
  getKanjiController,
  getKanjisController,
  getSearchResultsController,
  searchFromMeaningController,
} from "./dictionary.controller.js"

const router = Router()

router.get("/search", getSearchResultsController)
router.get("/search/meaning", searchFromMeaningController)

router.get("/kanji", getKanjiController)
router.get("/kanjis", getKanjisController)

export default router

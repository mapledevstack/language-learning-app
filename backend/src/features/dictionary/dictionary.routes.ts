import { Router } from "express"
import {
  getKanjiController,
  getKanjisController,
  getSearchResultsController,
  getSentencesController,
  searchFromMeaningController,
} from "./dictionary.controller.js"

const router = Router()

router.get("/search", getSearchResultsController)
router.get("/search/meaning", searchFromMeaningController)
router.get("/sentences", getSentencesController)

router.get("/kanji", getKanjiController)
router.get("/kanjis", getKanjisController)

export default router

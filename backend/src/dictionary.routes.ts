import { Router } from "express"
import {
  getAllWordsController,
  searchWordsController,
} from "./dictionary.controller.js"

const router = Router()

router.get("/", getAllWordsController)
router.get("/search", searchWordsController)

export default router

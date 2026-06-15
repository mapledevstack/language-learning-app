import { Router } from "express"
import { searchWordsController } from "./dictionary.controller.js"

const router = Router()

router.get("/search", searchWordsController)

export default router

import { Router } from "express"
import { createFlashCardController } from "./flashcard.controller.js"

const router = Router()

router.post("/", createFlashCardController)

export default router

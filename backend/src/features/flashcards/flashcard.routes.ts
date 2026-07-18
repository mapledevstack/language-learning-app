import { Router } from "express"
import {
  createFlashCardController,
  deleteFlashCardController,
  getFlashCardsController,
  updateFlashCardController,
} from "./flashcard.controller.js"

const router = Router()

router.post("/", createFlashCardController)

router.get("/:deckId", getFlashCardsController)
router.delete("/:flashcardId", deleteFlashCardController)
router.patch("/:flashcardId", updateFlashCardController)

export default router

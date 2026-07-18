import { Router } from "express"
import {
  createFlashCardController,
  deleteFlashCardController,
  getDueFlashCardsController,
  getFlashCardsController,
  reviewFlashCardController,
  updateFlashCardController,
} from "./flashcard.controller.js"

const router = Router()

router.post("/", createFlashCardController)

router.get("/deck/:deckId", getFlashCardsController)
router.get("/deck/:deckId/due", getDueFlashCardsController)

router.delete("/:flashcardId", deleteFlashCardController)
router.patch("/:flashcardId", updateFlashCardController)
router.post("/:flashcardId/review", reviewFlashCardController)

export default router

import { Router } from "express"
import {
  createDeckController,
  deleteDeckController,
  getDeckController,
  getDecksController,
  updateDeckController,
} from "./deck.controller.js"

const router = Router()

router.get("/", getDecksController)
router.post("/", createDeckController)

router.get("/:deckId", getDeckController)
router.patch("/:deckId", updateDeckController)
router.delete("/:deckId", deleteDeckController)

export default router

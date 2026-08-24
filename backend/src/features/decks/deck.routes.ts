import { Router } from "express"
import {
  createDeckController,
  deleteDeckController,
  getDeckController,
  getDecksController,
  getDeckStatsController,
  updateDeckController,
} from "./deck.controller.js"
import requireRealUser from "../../middleware/requireRealUser.js"

const router = Router()

router.get("/", getDecksController)
router.post("/", requireRealUser, createDeckController)

router.get("/:deckId", getDeckController)
router.get("/:deckId/stats", getDeckStatsController)

router.patch("/:deckId", requireRealUser, updateDeckController)
router.delete("/:deckId", requireRealUser, deleteDeckController)

export default router

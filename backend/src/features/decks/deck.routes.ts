import { Router } from "express"
import { createDeckController, getDecksController } from "./deck.controller.js"

const router = Router()

router.get("/", getDecksController)
router.post("/", createDeckController)

export default router

import { Router } from "express"
import {
  deleteSessionController,
  getSessionsController,
} from "./session.controller.js"

const router = Router()

router.get("/", getSessionsController)
router.delete("/:id", deleteSessionController)

export default router

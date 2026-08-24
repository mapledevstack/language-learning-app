import { Router } from "express"
import {
  getUserActivityController,
  getUserController,
  updateUserController,
} from "./user.controller.js"

const router = Router()

router.get("/", getUserController)

router.patch("/", updateUserController)

router.get("/activity", getUserActivityController)

export default router

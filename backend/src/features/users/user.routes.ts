import { Router } from "express"
import { getUserController, updateUserController } from "./user.controller.js"

const router = Router()

router.get("/", getUserController)

router.patch("/", updateUserController)

export default router

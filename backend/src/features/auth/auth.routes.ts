import { Router } from "express"
import {
  loginUserController,
  registerUserController,
} from "./auth.controller.js"

const router = Router()

router.post("/register", registerUserController)
router.post("/login", loginUserController)
// router.get("/logout")

export default router

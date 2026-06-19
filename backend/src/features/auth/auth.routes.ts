import { Router } from "express"
import {
  loginUserController,
  logoutUserController,
  registerUserController,
} from "./auth.controller.js"

const router = Router()

router.post("/register", registerUserController)
router.post("/login", loginUserController)
router.get("/logout", logoutUserController)

export default router

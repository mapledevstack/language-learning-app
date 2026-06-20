import { Router } from "express"
import {
  loginUserController,
  logoutUserController,
  refreshAccessTokenController,
  registerUserController,
} from "./auth.controller.js"

const router = Router()

router.post("/register", registerUserController)
router.post("/login", loginUserController)
router.post("/logout", logoutUserController)
router.get("/refresh", refreshAccessTokenController)

export default router

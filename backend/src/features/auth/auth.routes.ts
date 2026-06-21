import { Router } from "express"
import {
  loginUserController,
  logoutUserController,
  refreshAccessTokenController,
  registerUserController,
  verifyEmailController,
} from "./auth.controller.js"

const router = Router()

router.post("/register", registerUserController)
router.post("/login", loginUserController)
router.post("/logout", logoutUserController)
router.get("/refresh", refreshAccessTokenController)
router.get("/email/verify/:code", verifyEmailController)

export default router

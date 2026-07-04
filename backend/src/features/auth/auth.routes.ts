import { Router } from "express"
import {
  demoLoginController,
  loginUserController,
  logoutUserController,
  refreshAccessTokenController,
  registerUserController,
  resetPasswordController,
  sendPasswordResetEmailController,
  verifyEmailController,
} from "./auth.controller.js"

const router = Router()

router.post("/register", registerUserController)
router.post("/login", loginUserController)
router.post("/login/demo", demoLoginController)
router.post("/logout", logoutUserController)

router.get("/refresh", refreshAccessTokenController)

router.get("/email/verify/:code", verifyEmailController)

router.post("/password/forgot", sendPasswordResetEmailController)
router.post("/password/reset", resetPasswordController)

export default router

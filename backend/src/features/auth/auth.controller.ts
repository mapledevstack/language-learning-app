import catchErrors from "../../utils/catchErrors.js"
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resetPassword,
  sendPasswordResetEmail,
  verifyEmail,
} from "./auth.service.js"
import { CREATED, OK, UNAUTHORIZED } from "../../constants/http.js"
import {
  clearAuthCookies,
  setAccessCookie,
  setAuthCookies,
  setRefreshCookie,
} from "../../utils/cookies.js"
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verificationCodeSchema,
} from "./auth.schemas.js"
import AppError from "../../utils/appError.js"

export const registerUserController = catchErrors(async (req, res) => {
  const request = registerSchema.parse(req.body)

  const registerParams = {
    email: request.email,
    password: request.password,
    userAgent: req.headers["user-agent"],
  }

  const { user, refreshToken, accessToken } = await registerUser(registerParams)

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user)
})

export const loginUserController = catchErrors(async (req, res) => {
  const request = loginSchema.parse(req.body)

  const loginParams = {
    email: request.email,
    password: request.password,
    userAgent: req.headers["user-agent"],
  }

  const { user, accessToken, refreshToken } = await loginUser(loginParams)

  return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
    message: "Login successful",
    user,
  })
})

export const logoutUserController = catchErrors(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string | undefined

  if (refreshToken) {
    await logoutUser(refreshToken)
  }

  return clearAuthCookies(res).status(OK).json({ message: "Logout successful" })
})

export const refreshAccessTokenController = catchErrors(async (req, res) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    clearAuthCookies(res)
    throw new AppError("Missing refresh token", UNAUTHORIZED)
  }

  try {
    const { newAccessToken, newRefreshToken } =
      await refreshAccessToken(refreshToken)

    setAccessCookie(res, newAccessToken)

    if (newRefreshToken !== refreshToken) {
      setRefreshCookie(res, newRefreshToken)
    }

    return res.status(OK).json({ message: "Access token refreshed" })
  } catch (error) {
    clearAuthCookies(res)
    throw error
  }
})

export const verifyEmailController = catchErrors(async (req, res) => {
  const verificationCodeId = verificationCodeSchema.parse(req.params.code)

  await verifyEmail(verificationCodeId)

  return res.status(OK).json({ message: "Email successfully verified" })
})

export const sendPasswordResetEmailController = catchErrors(
  async (req, res) => {
    const email = emailSchema.parse(req.body.email)

    await sendPasswordResetEmail(email)

    return res.status(200).json({ message: "Password reset email sent" })
  },
)

export const resetPasswordController = catchErrors(async (req, res) => {
  const { verificationCodeId, password } = resetPasswordSchema.parse(req.body)

  await resetPassword(verificationCodeId, password)

  return clearAuthCookies(res).status(OK).json({
    message: "Password reset successfully",
  })
})

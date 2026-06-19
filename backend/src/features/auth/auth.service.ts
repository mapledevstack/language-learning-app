import { JWT_REFRESH_SECRET, JWT_SECRET } from "../../constants/env.js"
import { CONFLICT } from "../../constants/http.js"
import AppError from "../../utils/appError.js"
import { oneYearFromNow } from "../../utils/date.js"
import { User } from "../users/user.model.js"
import { Session, VerificationCode } from "./auth.model.js"
import { VerificationCodes } from "./auth.types.js"
import jwt from "jsonwebtoken"

export type RegisterParams = {
  email: string
  password: string
  userAgent?: string | undefined
}

export const register = async ({
  email,
  password,
  userAgent,
}: RegisterParams) => {
  const existingUser = await User.exists({ email })

  if (existingUser) {
    throw new AppError("Email already in use", CONFLICT)
  }

  const user = await User.create({ email, password })

  const verificationCode = await VerificationCode.create({
    userId: user._id,
    type: VerificationCodes.EmailVerification,
    expiresAt: oneYearFromNow(),
  })

  const session = await Session.create({
    userId: user._id,
    ...(userAgent && { userAgent }),
  })

  const accessToken = jwt.sign(
    { userId: user._id, sessionId: session._id },
    JWT_SECRET,
    { audience: ["user"], expiresIn: "15m" },
  )

  const refreshToken = jwt.sign(
    { sessionId: session._id },
    JWT_REFRESH_SECRET,
    { audience: ["user"], expiresIn: "30d" },
  )

  return { user: user.omitPassword(), accessToken, refreshToken }
}

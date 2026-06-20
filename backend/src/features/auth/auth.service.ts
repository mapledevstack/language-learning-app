import { CONFLICT, UNAUTHORIZED } from "../../constants/http.js"
import AppError from "../../utils/appError.js"
import {
  ONE_DAY_MS,
  oneYearFromNow,
  thirtyDaysFromNow,
} from "../../utils/date.js"
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.js"
import { User } from "../users/user.model.js"
import { Session, VerificationCode } from "./auth.model.js"
import { VerificationCodes } from "./auth.types.js"

type RegisterParams = {
  email: string
  password: string
  userAgent?: string | undefined
}

export const registerUser = async ({
  email,
  password,
  userAgent,
}: RegisterParams) => {
  const existingUser = await User.exists({ email })

  if (existingUser) {
    throw new AppError("Email already in use", CONFLICT)
  }

  const user = await User.create({ email, password })
  const userId = user._id

  const verificationCode = await VerificationCode.create({
    userId,
    type: VerificationCodes.EmailVerification,
    expiresAt: oneYearFromNow(),
  })

  const session = await Session.create({
    userId,
    ...(userAgent && { userAgent }),
  })
  const sessionId = session._id

  const accessToken = signAccessToken({ userId, sessionId })

  const refreshToken = signRefreshToken({ sessionId })

  return { user: user.omitPassword(), accessToken, refreshToken }
}

type LoginParams = {
  email: string
  password: string
  userAgent?: string | undefined
}

export const loginUser = async ({
  email,
  password,
  userAgent,
}: LoginParams) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new AppError("Invalid email or password", UNAUTHORIZED)
  }

  const isValid = await user.comparePassword(password)

  if (!isValid) {
    throw new AppError("Invalid email or password", UNAUTHORIZED)
  }

  const userId = user._id

  const session = await Session.create({
    userId,
    ...(userAgent && { userAgent }),
  })
  const sessionId = session._id

  const accessToken = signAccessToken({ userId, sessionId })

  const refreshToken = signRefreshToken({ sessionId })

  return { user: user.omitPassword(), accessToken, refreshToken }
}

export const logoutUser = async (refreshToken: string) => {
  try {
    const { sessionId } = verifyRefreshToken(refreshToken)
    await Session.findByIdAndDelete(sessionId)
  } catch {
    // ignore session deletion and just clear cookies
  }
}

export const refreshAccessToken = async (refreshToken: string) => {
  const { sessionId } = verifyRefreshToken(refreshToken)

  const session = await Session.findById(sessionId)

  if (!session || session.expiresAt.getTime() < Date.now()) {
    throw new AppError("Session Expired", UNAUTHORIZED)
  }

  // refresh the session and sign new refresh token if session expires within a day
  const needsRefresh = session.expiresAt.getTime() - Date.now() < ONE_DAY_MS
  if (needsRefresh) {
    session.expiresAt = thirtyDaysFromNow()
    await session.save()
  }

  const newRefreshToken = needsRefresh
    ? signRefreshToken({ sessionId })
    : refreshToken

  const newAccessToken = signAccessToken({ userId: session.userId, sessionId })

  return { newAccessToken, newRefreshToken }
}

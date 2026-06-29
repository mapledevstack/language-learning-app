import { APP_ORIGIN } from "../../constants/env.js"
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
} from "../../constants/http.js"
import AppError from "../../utils/appError.js"
import {
  fiveMinutesAgo,
  ONE_DAY_MS,
  oneHourFromNow,
  oneYearFromNow,
  thirtyDaysFromNow,
} from "../../utils/date.js"
import {
  passwordResetTemplate,
  verifyEmailTemplate,
} from "../../utils/emailTemplates.js"
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.js"
import { sendMail } from "../../utils/sendMail.js"
import { User } from "../users/user.model.js"
import { VerificationCode } from "./auth.model.js"
import { Session } from "./session.model.js"
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

  const url = `${APP_ORIGIN}/auth/email/verify/${verificationCode._id}`

  const { data, error } = await sendMail({
    to: user.email,
    ...verifyEmailTemplate(url),
  })

  if (error) {
    console.log(`Email error: ${error}`)
  }

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

export const verifyEmail = async (verificationCodeId: string) => {
  const verification = await VerificationCode.findOne({
    _id: verificationCodeId,
    type: VerificationCodes.EmailVerification,
    expiresAt: { $gt: new Date() },
  })

  if (!verification) {
    throw new AppError("Verification code invalid or expired", NOT_FOUND)
  }

  const updatedUser = await User.findByIdAndUpdate(
    verification.userId,
    { verified: true },
    { returnDocument: "after" },
  )

  if (!updatedUser) {
    throw new AppError("Failed to verify email", INTERNAL_SERVER_ERROR)
  }

  await verification.deleteOne()

  return { user: updatedUser.omitPassword() }
}

export const sendPasswordResetEmail = async (email: string) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new AppError("User not found", NOT_FOUND)
  }

  const fiveMinsAgo = fiveMinutesAgo()
  const recentRequestCount = await VerificationCode.countDocuments({
    userId: user._id,
    type: VerificationCodes.PasswordReset,
    createdAt: { $gt: fiveMinsAgo },
  })

  if (recentRequestCount > 5) {
    throw new AppError("Rate limit exceeded", TOO_MANY_REQUESTS)
  }

  const verification = await VerificationCode.create({
    userId: user._id,
    type: VerificationCodes.PasswordReset,
    expiresAt: oneHourFromNow(),
  })

  const url = `${APP_ORIGIN}/auth/password/reset?code=${verification._id}&exp=${verification.expiresAt.getTime()}`

  const { data, error } = await sendMail({
    to: user.email,
    ...passwordResetTemplate(url),
  })

  if (!data?.id) {
    throw new AppError(
      `${error?.name} - ${error?.message}`,
      INTERNAL_SERVER_ERROR,
    )
  }

  return { url, emailId: data.id }
}

export const resetPassword = async (
  verificationCode: string,
  password: string,
) => {
  const verification = await VerificationCode.findOne({
    _id: verificationCode,
    type: VerificationCodes.PasswordReset,
    expiresAt: { $gt: new Date() },
  })

  if (!verification) {
    throw new AppError("Invalid or expired verification code", NOT_FOUND)
  }

  const user = await User.findById(verification.userId)
  if (!user) {
    throw new AppError("Failed to update password", INTERNAL_SERVER_ERROR)
  }

  user.updatePassword(password)
  await user.save()

  await verification.deleteOne()

  await Session.deleteMany({ userId: user._id })

  return { user: user.omitPassword() }
}

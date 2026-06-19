import { SignOptions } from "jsonwebtoken"
import jwt from "jsonwebtoken"
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env.js"
import { Types } from "mongoose"

export type AccessTokenPayload = {
  sessionId: Types.ObjectId
  userId: Types.ObjectId
}

export type RefreshTokenPayload = {
  sessionId: Types.ObjectId
}

const defaults: SignOptions = {
  audience: ["user"],
}

export const signAccessToken = (payload: AccessTokenPayload) =>
  jwt.sign(payload, JWT_SECRET, { ...defaults, expiresIn: "15m" })

export const signRefreshToken = (payload: RefreshTokenPayload) =>
  jwt.sign(payload, JWT_REFRESH_SECRET, { ...defaults, expiresIn: "30d" })

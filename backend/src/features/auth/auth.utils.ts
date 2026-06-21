import { Request } from "express"
import AppError from "../../utils/appError.js"
import { UNAUTHORIZED } from "../../constants/http.js"

export const getAuthUserId = (req: Request) => {
  if (!req.userId) {
    throw new AppError("Not authorized", UNAUTHORIZED)
  }

  return req.userId
}

export const getAuthSessionId = (req: Request) => {
  if (!req.sessionId) {
    throw new AppError("Not authorized", UNAUTHORIZED)
  }

  return req.sessionId
}

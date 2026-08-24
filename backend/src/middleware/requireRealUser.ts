import { RequestHandler } from "express"
import { getAuthUserId } from "../features/auth/auth.utils.js"
import AppError from "../utils/appError.js"
import { FORBIDDEN } from "../constants/http.js"
import { DEMO_USER_ID } from "../constants/env.js"

const requireRealUser: RequestHandler = (req, _res, next) => {
  const userId = getAuthUserId(req)

  if (userId.toString() === DEMO_USER_ID) {
    throw new AppError("Demo account is read only", FORBIDDEN)
  }

  next()
}

export default requireRealUser

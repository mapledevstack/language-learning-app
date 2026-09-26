import { RequestHandler } from "express"
import { getIsDemo } from "../features/auth/auth.utils.js"
import AppError from "../utils/appError.js"
import { FORBIDDEN } from "../constants/http.js"

const requireRealUser: RequestHandler = (req, _res, next) => {
  if (getIsDemo(req)) {
    throw new AppError("Demo account is read only", FORBIDDEN)
  }

  next()
}

export default requireRealUser

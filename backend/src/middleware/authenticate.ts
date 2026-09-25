import { RequestHandler } from "express"
import AppError from "../utils/appError.js"
import { UNAUTHORIZED } from "../constants/http.js"
import { verifyAccessToken } from "../utils/jwt.js"
import { Types } from "mongoose"

const authenticate: RequestHandler = (req, _res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined

  if (!accessToken) {
    throw new AppError("Not authorized", UNAUTHORIZED)
  }

  const { sessionId, userId } = verifyAccessToken(accessToken)

  req.userId = new Types.ObjectId(userId)
  req.sessionId = new Types.ObjectId(sessionId)

  next()
}

export default authenticate

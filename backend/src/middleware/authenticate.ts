import { RequestHandler } from "express"
import AppError from "../utils/appError.js"
import { UNAUTHORIZED } from "../constants/http.js"
import { verifyAccessToken } from "../utils/jwt.js"

const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined

  if (!accessToken) {
    throw new AppError("Not authorized", UNAUTHORIZED)
  }

  const { sessionId, userId } = verifyAccessToken(accessToken)

  req.userId = userId
  req.sessionId = sessionId

  next()
}

export default authenticate

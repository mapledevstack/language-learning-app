import { Types } from "mongoose"
import { Session } from "./session.model.js"
import AppError from "../../utils/appError.js"
import { NOT_FOUND } from "../../constants/http.js"

export const getSessions = async (
  userId: Types.ObjectId,
  sessionId: Types.ObjectId,
) => {
  const sessions = await Session.find(
    { userId, expiresAt: { $gt: new Date() } },
    { _id: 1, userAgent: 1, createdAt: 1 },
    { sort: { createdAt: -1 } },
  )

  return sessions.map((session) => ({
    ...session.toObject(),
    ...(session._id.equals(sessionId) && { isCurrent: true }),
  }))
}

export const deleteSession = async (
  userId: Types.ObjectId,
  sessionId: string,
) => {
  const deleted = await Session.findOneAndDelete({ _id: sessionId, userId })

  if (!deleted) {
    throw new AppError("Session not found", NOT_FOUND)
  }
}

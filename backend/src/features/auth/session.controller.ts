import { z } from "zod"
import { OK } from "../../constants/http.js"
import catchErrors from "../../utils/catchErrors.js"
import { getAuthSessionId, getAuthUserId } from "./auth.utils.js"
import { deleteSession, getSessions } from "./session.service.js"

export const getSessionsController = catchErrors(async (req, res) => {
  const userId = getAuthUserId(req)
  const sessionId = getAuthSessionId(req)

  const sessions = await getSessions(userId, sessionId)

  return res.status(OK).json(sessions)
})

export const deleteSessionController = catchErrors(async (req, res) => {
  const sessionId = z.string().parse(req.params.id)
  const userId = getAuthUserId(req)

  await deleteSession(userId, sessionId)

  return res.status(OK).json({ message: "Session removed" })
})

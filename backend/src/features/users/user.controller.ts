import { OK } from "../../constants/http.js"
import catchErrors from "../../utils/catchErrors.js"
import { getAuthUserId } from "../auth/auth.utils.js"
import { updateUserSchema } from "./user.schema.js"
import { getUser, updateUser } from "./user.service.js"

export const getUserController = catchErrors(async (req, res) => {
  const userId = getAuthUserId(req)

  const user = await getUser(userId)

  return res.status(OK).json(user)
})

export const updateUserController = catchErrors(async (req, res) => {
  const userId = getAuthUserId(req)
  const body = updateUserSchema.parse(req.body)

  const user = await updateUser(userId, body)

  return res.status(OK).json(user)
})

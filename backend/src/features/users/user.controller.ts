import { OK } from "../../constants/http.js"
import catchErrors from "../../utils/catchErrors.js"
import { getAuthUserId } from "../auth/auth.utils.js"
import { getUser } from "./user.service.js"

export const getUserController = catchErrors(async (req, res) => {
  const userId = getAuthUserId(req)

  const user = await getUser(userId)

  return res.status(OK).json(user)
})

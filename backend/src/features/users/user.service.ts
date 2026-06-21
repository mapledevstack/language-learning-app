import { Types } from "mongoose"
import { User } from "./user.model.js"
import AppError from "../../utils/appError.js"
import { NOT_FOUND } from "../../constants/http.js"

export const getUser = async (userId: Types.ObjectId) => {
  const user = await User.findById(userId)

  if (!user) {
    throw new AppError("User not found", NOT_FOUND)
  }

  return user.omitPassword()
}

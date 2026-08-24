import { Types } from "mongoose"
import { User } from "./user.model.js"
import AppError from "../../utils/appError.js"
import { NOT_FOUND } from "../../constants/http.js"
import { UpdateUser } from "./user.schema.js"
import { UserActivity } from "./userActivity.model.js"
import { after } from "node:test"

export const getUser = async (userId: Types.ObjectId) => {
  const user = await User.findById(userId)

  if (!user) {
    throw new AppError("User not found", NOT_FOUND)
  }

  return user.omitPassword()
}

export const updateUser = async (userId: Types.ObjectId, body: UpdateUser) => {
  const user = await User.findByIdAndUpdate(userId, body, {
    returnDocument: "after",
  })

  if (!user) {
    throw new AppError("User not found", NOT_FOUND)
  }

  return user.omitPassword()
}

export const getUserActivity = async (
  userId: Types.ObjectId,
  startDate: Date,
) => {
  return UserActivity.find(
    {
      userId,
      date: { $gte: startDate },
    },
    {
      _id: 0,
      userId: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    },
  ).sort({ date: 1 })
}

export const incrementReviewCount = async (
  userId: Types.ObjectId,
  date: Date,
) => {
  return UserActivity.findOneAndUpdate(
    {
      userId,
      date,
    },
    {
      $inc: { reviewCount: 1 },
    },
    {
      upsert: true,
      returnDocument: "after",
    },
  )
}

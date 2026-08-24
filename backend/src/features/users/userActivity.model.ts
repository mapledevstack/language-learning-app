import { Document, model, Schema, Types } from "mongoose"

export interface UserActivityDocument extends Document {
  userId: Types.ObjectId
  date: Date
  reviewCount: number
}

const userActivitySchema = new Schema<UserActivityDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true },
)

userActivitySchema.index({ userId: 1, date: 1 }, { unique: true })

export const UserActivity = model("UserActivity", userActivitySchema)

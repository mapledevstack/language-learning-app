import { model, Schema } from "mongoose"
import { thirtyDaysFromNow } from "../../utils/date.js"

const sessionSchema = new Schema(
  {
    userId: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    userAgent: { type: String },

    expiresAt: { type: Date, default: thirtyDaysFromNow },
  },
  { timestamps: true },
)

export const Session = model("Session", sessionSchema)

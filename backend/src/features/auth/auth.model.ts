import { model, Schema } from "mongoose"
import { VerificationCodes } from "./auth.types.js"
import { thirtyDaysFromNow } from "../../utils/date.js"

const verificationCodeSchema = new Schema(
  {
    userId: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    type: {
      type: String,
      required: true,
      enum: Object.values(VerificationCodes),
    },

    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
)

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

export const VerificationCode = model(
  "VerificationCode",
  verificationCodeSchema,
  "verification-codes",
)
export const Session = model("Session", sessionSchema)

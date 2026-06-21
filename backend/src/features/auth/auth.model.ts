import { model, Schema } from "mongoose"
import { VerificationCodes } from "./auth.types.js"

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

export const VerificationCode = model(
  "VerificationCode",
  verificationCodeSchema,
  "verification-codes",
)

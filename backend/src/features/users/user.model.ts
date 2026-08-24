import { Document, model, Schema, Types } from "mongoose"
import { compareValue, hashValue } from "../../utils/bcrypt.js"
import { COLOR_THEMES } from "../../constants/colorThemes.js"

export interface UserDocument extends Document {
  email: string
  password: string
  displayName: string
  verified: boolean
  preferences: Object

  comparePassword(val: string): Promise<boolean>
  omitPassword(): Omit<UserDocument, "password">
  updatePassword(password: string): void
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    displayName: { type: String, required: false },
    verified: { type: Boolean, default: false },
    preferences: {
      colorTheme: {
        type: String,
        enum: COLOR_THEMES,
        default: COLOR_THEMES[0],
      },
      animationsEnabled: {
        type: Boolean,
        default: true,
      },
    },
  },
  { timestamps: true },
)

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return

  this.password = await hashValue(this.password)
})

userSchema.methods.comparePassword = async function (value: string) {
  return compareValue(value, this.password)
}

userSchema.methods.omitPassword = function () {
  const userObj = this.toObject()
  const { password, ...obj } = userObj
  return obj
}

userSchema.methods.updatePassword = async function (password: string) {
  this.password = password
}

export const User = model("User", userSchema)

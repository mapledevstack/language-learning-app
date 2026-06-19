import { model, Schema } from "mongoose"
import { compareValue, hashValue } from "../../utils/bcrypt.js"

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
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
  delete userObj.password
  return userObj
}

export const User = model("User", userSchema)

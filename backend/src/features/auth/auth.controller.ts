import catchErrors from "../../utils/catchErrors.js"
import { z } from "zod"
import { register } from "./auth.service.js"
import { CREATED } from "../../constants/http.js"
import { setAuthCookies } from "../../utils/cookies.js"

const registerSchema = z
  .object({
    email: z.email(),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    error: "Passwords do not match",
  })

export const registerController = catchErrors(async (req, res) => {
  const request = registerSchema.parse(req.body)

  const params = {
    email: request.email,
    password: request.password,
    userAgent: req.headers["user-agent"],
  }

  const { user, refreshToken, accessToken } = await register(params)

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user)
})

import catchErrors from "../../utils/catchErrors.js"
import { loginUser, registerUser } from "./auth.service.js"
import { CREATED, OK } from "../../constants/http.js"
import { clearAuthCookies, setAuthCookies } from "../../utils/cookies.js"
import { loginSchema, registerSchema } from "./auth.schemas.js"
import { verifyRefreshToken } from "../../utils/jwt.js"
import { Session } from "./auth.model.js"

export const registerUserController = catchErrors(async (req, res) => {
  const request = registerSchema.parse(req.body)

  const registerParams = {
    email: request.email,
    password: request.password,
    userAgent: req.headers["user-agent"],
  }

  const { user, refreshToken, accessToken } = await registerUser(registerParams)

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user)
})

export const loginUserController = catchErrors(async (req, res) => {
  const request = loginSchema.parse(req.body)

  const loginParams = {
    email: request.email,
    password: request.password,
    userAgent: req.headers["user-agent"],
  }

  const { user, accessToken, refreshToken } = await loginUser(loginParams)

  return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
    message: "Login successful",
  })
})

export const logoutUserController = catchErrors(async (req, res) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) {
    return clearAuthCookies(res)
      .status(OK)
      .json({ message: "Logout successful" })
  }

  const { sessionId } = verifyRefreshToken(refreshToken)

  await Session.findByIdAndDelete(sessionId)

  return clearAuthCookies(res).status(OK).json({ message: "Logout successful" })
})

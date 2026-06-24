import api from "@/utils/api"
import type {
  LoginInput,
  ResetInput,
  SigninInput,
} from "../schemas/inputSchema"
import { UserSchema, type User } from "../schemas/userSchemas"

export const login = (input: LoginInput) => api.post("/auth/login", input)

export const signup = (input: SigninInput) => api.post("/auth/register", input)

export const logout = () => api.post("/auth/logout")

export const verifyEmail = (code: string) =>
  api.get(`/auth/email/verify/${code}`)

export const sendPasswordResetEmail = (email: string) =>
  api.post("/auth/password/forgot", { email })

export const resetPassword = (input: ResetInput) =>
  api.post("/auth/password/reset", input)

export const getCurrentUser = async (): Promise<User> => {
  const user = await api.get("/me")
  return UserSchema.parse(user)
}

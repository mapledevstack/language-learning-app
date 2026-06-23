import api from "@/utils/api"
import type { LoginInput, SigninInput } from "../schemas/inputSchema"

export const login = async (input: LoginInput) =>
  api("/auth/login", { method: "POST", body: JSON.stringify(input) })

export const signup = async (input: SigninInput) =>
  api("/auth/register", { method: "POST", body: JSON.stringify(input) })

export const verifyEmail = async (code: string) =>
  api(`/auth/email/verify/${code}`, { method: "GET" })

export const sendPasswordResetEmail = async (email: string) =>
  api("/auth/password/forgot", {
    method: "POST",
    body: JSON.stringify({ email }),
  })

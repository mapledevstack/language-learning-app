import { API_BASE_URL } from "@/constants/env"
import type { LoginInput } from "../schemas/loginSchema"

export const login = async (input: LoginInput) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })

  if (!res.ok) {
    throw new Error("Login failed")
  }

  return res.json()
}

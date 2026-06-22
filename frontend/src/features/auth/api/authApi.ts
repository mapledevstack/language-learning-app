import api from "@/utils/api"
import type { LoginInput } from "../schemas/loginSchema"

export const login = async (input: LoginInput) => {
  return api("/auth/login", { method: "POST", body: JSON.stringify(input) })
}

import AuthPage from "@/features/auth/pages/AuthPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_public/auth")({
  validateSearch: (search) => ({
    mode: search.mode === AUTH_MODE.SIGNUP ? AUTH_MODE.SIGNUP : AUTH_MODE.LOGIN,
  }),
  component: AuthPage,
})

export const AUTH_MODE = {
  LOGIN: "login",
  SIGNUP: "signup",
} as const

export type AuthMode = (typeof AUTH_MODE)[keyof typeof AUTH_MODE]

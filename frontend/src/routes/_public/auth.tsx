import AuthPage from "@/features/auth/pages/AuthPage"
import { AUTH_MODE } from "@/features/auth/schemas/authModes"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_public/auth")({
  validateSearch: (search) => ({
    mode: search.mode === AUTH_MODE.SIGNUP ? AUTH_MODE.SIGNUP : AUTH_MODE.LOGIN,
  }),
  component: AuthPage,
})

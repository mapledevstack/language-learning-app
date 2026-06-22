import AuthPage from "@/features/auth/pages/AuthPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_public/auth")({
  component: AuthPage,
})

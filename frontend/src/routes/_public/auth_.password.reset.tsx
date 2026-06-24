import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_public/auth_/password/reset")({
  component: ResetPasswordPage,
})

import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_public/auth_/password/forgot")({
  component: ForgotPasswordPage,
})

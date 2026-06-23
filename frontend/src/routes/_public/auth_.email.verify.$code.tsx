import EmailVerificationPage from "@/features/auth/pages/EmailVerificationPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_public/auth_/email/verify/$code")({
  component: EmailVerificationPage,
})

import LandingPage from "@/features/landing/pages/LandingPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_public/")({
  component: LandingPage,
})

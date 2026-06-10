import PublicLayout from "@/layouts/PublicLayout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_public")({
  component: PublicLayout,
})

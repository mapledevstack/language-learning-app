import ImmersionHomePage from "@/features/immersion/pages/ImmersionHomePage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/immersion/")({
  component: ImmersionHomePage,
})

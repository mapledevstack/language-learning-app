import ImmersionWatchPage from "@/features/immersion/pages/ImmersionWatchPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/immersion/$vidId")({
  component: ImmersionWatchPage,
})

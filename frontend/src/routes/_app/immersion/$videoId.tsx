import WatchPage from "@/features/immersion/pages/WatchPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/immersion/$videoId")({
  component: WatchPage,
})

import TopicPage from "@/features/immersion/pages/TopicPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/immersion/topics/$topicId")({
  component: TopicPage,
})

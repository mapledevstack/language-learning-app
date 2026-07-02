import GrammarPage from "@/features/grammar/pages/GrammarPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/grammar")({
  component: GrammarPage,
})

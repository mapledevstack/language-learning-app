import { createFileRoute } from "@tanstack/react-router"
import DeckStudyPage from "@/features/decks/pages/DeckStudyPage"

export const Route = createFileRoute("/_app/decks/$deckId/")({
  component: DeckStudyPage,
})

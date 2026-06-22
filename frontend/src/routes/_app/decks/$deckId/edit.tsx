import DeckEditPage from "@/features/decks/pages/DeckEditPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/decks/$deckId/edit")({
  component: DeckEditPage,
})

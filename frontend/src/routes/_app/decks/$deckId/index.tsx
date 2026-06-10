import { createFileRoute } from "@tanstack/react-router"
import FlashCardPage from "@/features/decks/pages/FlashCardsPage"

export const Route = createFileRoute("/_app/decks/$deckId/")({
  component: FlashCardPage,
})

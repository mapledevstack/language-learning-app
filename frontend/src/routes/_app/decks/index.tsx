import { createFileRoute } from "@tanstack/react-router"
import DecksPage from "@/features/decks/pages/DecksPage"

export const Route = createFileRoute("/_app/decks/")({
  component: DecksPage,
})

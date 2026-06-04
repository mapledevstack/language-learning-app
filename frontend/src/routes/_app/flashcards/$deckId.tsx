import FlashCardPage from '@/components/pages/FlashCardPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/flashcards/$deckId')({
  component: FlashCardPage,
})

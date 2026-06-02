import FlashcardsPage from '@/components/pages/FlashcardsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/flashcards/')({
  component: FlashcardsPage,
})

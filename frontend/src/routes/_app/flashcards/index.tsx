import DecksPage from '@/components/pages/DecksPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/flashcards/')({
  component: DecksPage,
})

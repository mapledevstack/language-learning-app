import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/decks/$deckId/edit')({
  component: FlashCardsEditPage,
})

function FlashCardsEditPage() {
  return <div>Hello "/_app/decks/$deckId/edit"!</div>
}

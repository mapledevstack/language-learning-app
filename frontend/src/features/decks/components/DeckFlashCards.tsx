import Card from "@/components/cards/Card"
import EmptyCard from "@/components/cards/EmptyCard"
import { Route } from "@/routes/_app/decks/$deckId/edit"

const DeckFlashCards = () => {
  const { deckId } = Route.useParams()

  return (
    <Card className="h-full min-h-0 overflow-x-hidden overflow-y-auto">
      <EmptyCard text="Deck Flash Cards" />
    </Card>
  )
}
export default DeckFlashCards

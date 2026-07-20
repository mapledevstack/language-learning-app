import EmptyCard from "@/components/cards/EmptyCard"
import useFlashCards from "../hooks/useFlashCards"
import Card from "@/components/cards/Card"
import FlashCardTable from "./FlashCardTable"
import { Route } from "@/routes/_app/decks/$deckId/edit"

const DeckFlashCards = () => {
  const { deckId } = Route.useParams()

  const { data: flashCards = [], isPending } = useFlashCards(deckId)

  return (
    <Card className="h-full min-h-0 overflow-auto">
      {flashCards.length === 0 ? (
        <EmptyCard text="This deck has no flashcards." />
      ) : (
        <FlashCardTable flashCards={flashCards} />
      )}
    </Card>
  )
}

export default DeckFlashCards

import { Route } from "@/routes/_app/decks/$deckId"
import useDueFlashCards from "../hooks/useDueFlashCards"
import EmptyCard from "@/components/cards/EmptyCard"
import FlipCard from "@/components/cards/FlipCard"
import StudyFlashCardFront from "../components/StudyFlashCardFront"
import StudyFlashCardBack from "../components/StudyFlashCardBack"
import useStudySession from "../hooks/useStudySession"
import { LucidePartyPopper } from "lucide-react"
import StudyControls from "../components/StudyControls"
import CardProgress from "../components/CardProgress"

const DeckStudyPage = () => {
  const { deckId } = Route.useParams()

  const { data: cards = [] } = useDueFlashCards(deckId)

  const {
    currentCard,
    finished,
    reveal,
    rate,
    totalCards,
    currentIndex,
    isFlipped,
  } = useStudySession(cards)

  if (!cards.length) {
    return <EmptyCard text="No cards to study for now" />
  }

  if (finished) {
    return (
      <EmptyCard
        text="Yohoo! Completed today's study session!"
        icon={LucidePartyPopper}
      />
    )
  }

  return (
    <>
      <div className="mx-auto flex w-fit flex-col gap-4 h-full items-center justify-center">
        <FlipCard
          front={<StudyFlashCardFront card={currentCard} />}
          back={<StudyFlashCardBack card={currentCard} />}
          isFlipped={isFlipped}
        />

        <StudyControls isFlipped={isFlipped} onReveal={reveal} onRate={rate} />

        <CardProgress current={currentIndex + 1} total={totalCards} />
      </div>
    </>
  )
}

export default DeckStudyPage

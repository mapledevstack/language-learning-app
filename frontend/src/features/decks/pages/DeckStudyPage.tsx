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
import BackToDeck from "@/layouts/BackToDeck"
import useCurrentUser from "@/features/auth/hooks/useCurrentUser"

const DeckStudyPage = () => {
  const { deckId } = Route.useParams()

  const { data: user } = useCurrentUser()
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
    return (
      <div className="relative h-screen">
        <div className="absolute top-4 left-4">
          <BackToDeck />
        </div>
        <EmptyCard text="No cards to study for now" />
      </div>
    )
  }

  if (finished) {
    return (
      <div className="h-screen">
        <EmptyCard
          text="Yohoo! Completed today's study session!"
          icon={LucidePartyPopper}
        />
      </div>
    )
  }

  return (
    <>
      <div className="absolute top-4 left-4">
        <BackToDeck />
      </div>

      <div className="mx-auto flex w-fit flex-col gap-4 h-screen items-center justify-center">
        <FlipCard
          front={<StudyFlashCardFront card={currentCard} />}
          back={<StudyFlashCardBack card={currentCard} />}
          isFlipped={isFlipped}
          flipAnimationEnabled={user?.preferences?.animationsEnabled ?? true}
        />

        <StudyControls isFlipped={isFlipped} onReveal={reveal} onRate={rate} />

        <CardProgress current={currentIndex + 1} total={totalCards} />
      </div>
    </>
  )
}

export default DeckStudyPage

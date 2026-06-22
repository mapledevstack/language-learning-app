import { useEffect, useState } from "react"
import { handleAgain, handleGood } from "../utils/srs"
import { motion } from "motion/react"
import { Route } from "@/routes/_app/decks/$deckId"
import useFlashCards from "../hooks/useFlashCards"
import FlashCardStats from "../components/FlashCardStats"
import FlipCard from "@/components/cards/FlipCard"
import StudyFlashCardFront from "../components/StudyFlashCardFront"
import StudyFlashCardBack from "../components/StudyFlashCardBack"

const DeckStudyPage = () => {
  const { deckId: deckIdParam } = Route.useParams()
  const deckId = Number(deckIdParam)

  // Find actual deck
  // const deck = decks.find(deck => deck.id === deckId)
  const { data: flashcards = [] } = useFlashCards()
  // Use actual Filtered Flashcards
  const allStudyCards = flashcards.filter((card) =>
    card.deckId.includes(deckId),
  )

  const [studyCards, setStudyCards] = useState(allStudyCards)
  const [index, setIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  // Move to Profile Settings
  const [flipAnimationEnabled, setFlipAnimationEnabled] = useState(true)

  const currentCard = studyCards[index]
  const remainingCards = studyCards.slice(index)
  const remainingCount = {
    new: remainingCards.filter((card) => card.status === "new").length,
    learning: remainingCards.filter((card) => card.status === "learning")
      .length,
    review: remainingCards.filter((card) => card.status === "review").length,
  }

  useEffect(() => {
    const handleKey = ({ key }: KeyboardEvent) => {
      if (!isFlipped && key === "ArrowUp") {
        setIsFlipped(true)
        return
      }

      if (isFlipped && key === "ArrowLeft") {
        setStudyCards((prev) => {
          const updatedCard = handleAgain(currentCard)
          return prev.map((card) => (card === currentCard ? updatedCard : card))
        })
        setIsFlipped(false)
        setIndex((prev) => prev + 1)
      } else if (isFlipped && key === "ArrowRight") {
        setStudyCards((prev) => {
          const updatedCard = handleGood(currentCard)
          return prev.map((card) => (card === currentCard ? updatedCard : card))
        })
        setIsFlipped(false)
        setIndex((prev) => prev + 1)
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isFlipped, currentCard])

  if (!currentCard) {
    return <div>No Cards to Study</div>
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-10 relative gap-10">
      <motion.div
        initial={{ opacity: 0, y: 50, x: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut" }}
      >
        <FlipCard
          isFlipped={isFlipped}
          flipAnimationEnabled={flipAnimationEnabled}
          front={<StudyFlashCardFront card={currentCard} />}
          back={<StudyFlashCardBack card={currentCard} />}
          symmetricFlip={false}
        />
      </motion.div>

      <FlashCardStats
        currentCard={currentCard}
        remainingCount={remainingCount}
      />
    </div>
  )
}

export default DeckStudyPage

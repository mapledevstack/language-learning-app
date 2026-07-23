import { useState } from "react"
import type { FlashCard } from "../schemas/FlashCardSchema"
import type { Rating } from "ts-fsrs"
import useReview from "./useReview"

const useStudySession = (cards: FlashCard[]) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const { mutate: reviewFlashCard } = useReview()

  const finished = currentIndex >= cards.length

  const reveal = () => {
    setIsFlipped(true)
  }

  const rate = (rating: Rating) => {
    setCurrentIndex((index) => index + 1)
    reviewFlashCard({ flashCardId: cards[currentIndex]._id, rating })
    setIsFlipped(false)
  }

  return {
    currentCard: cards[currentIndex],
    currentIndex,
    totalCards: cards.length,
    isFlipped,
    finished,
    reveal,
    rate,
  }
}

export default useStudySession

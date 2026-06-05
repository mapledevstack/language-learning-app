import type { FlashCard } from "@/schemas-and-types/FlashCardSchema"
import StudyFlashCardFront from "./StudyFlashCardFront"
import StudyFlashCardBack from "./StudyFlashCardBack"

type Props = {
  currentCard: FlashCard,
  flip: boolean
}

const StudyFlashCard = ({currentCard : card, flip} : Props) => {
  return (
      flip
        ? <StudyFlashCardBack card={card} />
        : <StudyFlashCardFront card={card} /> 
  )
}

export default StudyFlashCard

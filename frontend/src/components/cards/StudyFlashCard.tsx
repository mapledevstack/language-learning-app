import type { FlashCard } from "@/schemas-and-types/FlashCardSchema"
import Card from "./Card"

type Props = {
  currentCard: FlashCard | null,
  flip: boolean
}

const StudyFlashCard = ({currentCard : card, flip} : Props) => {
  if(!card) {
    return <div>Deck Complete</div>
  }

  return (
    <Card className="aspect-3/4 w-xs">
      {card.front.expression}
    </Card>
  )
}
export default StudyFlashCard

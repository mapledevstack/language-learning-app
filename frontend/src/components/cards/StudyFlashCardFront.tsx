import type { FlashCard } from "@/schemas-and-types/FlashCardSchema"
import Card from "./Card"

type Props = {
  card: FlashCard
}

const StudyFlashCardFront = ({ card }: Props) => {
  return (
    <Card className="aspect-3/4 w-xs">
      {card.front.expression}
    </Card>
  )
}
export default StudyFlashCardFront

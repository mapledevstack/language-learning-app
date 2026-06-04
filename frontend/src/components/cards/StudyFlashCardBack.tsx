import type { FlashCard } from "@/schemas-and-types/FlashCardSchema"
import Card from "./Card"

type Props = {
  card: FlashCard
}

const StudyFlashCardBack = ({ card }: Props) => {
  return (
    <Card className="aspect-3/4 w-xs">
      {card.back.reading}
      {card.back.meaning}
    </Card>
  )
}
export default StudyFlashCardBack

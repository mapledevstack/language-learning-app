import type { FlashCard } from "@/schemas/FlashCardSchema"

type Props = {
  card: FlashCard
}

const StudyFlashCardFront = ({ card }: Props) => {
  return (
    <div className="text-3xl size-full grid place-items-center">
      {card.front.expression}
    </div>
  )
}
export default StudyFlashCardFront

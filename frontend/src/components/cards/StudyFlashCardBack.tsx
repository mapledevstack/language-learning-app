import type { FlashCard } from "@/schemas/FlashCardSchema"

type Props = {
  card: FlashCard
}

const StudyFlashCardBack = ({ card }: Props) => {
  return (
    <div className="text-2xl size-full grid place-items-center">
      {card.back.reading}
      {card.back.meaning}
    </div>
  )
}
export default StudyFlashCardBack

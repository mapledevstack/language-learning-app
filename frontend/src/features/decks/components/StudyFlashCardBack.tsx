import type { FlashCard } from "@/features/decks/schemas/FlashCardSchema"

type Props = {
  card: FlashCard
}

const StudyFlashCardBack = ({ card }: Props) => {
  return (
    <div className="text-2xl size-full grid place-items-center">
      {card.front.text}
    </div>
  )
}
export default StudyFlashCardBack

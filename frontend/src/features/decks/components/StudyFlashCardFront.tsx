import type { FlashCard } from "@/features/decks/schemas/FlashCardSchema"

type Props = {
  card: FlashCard
}

const StudyFlashCardFront = ({ card }: Props) => {
  return (
    <div className="flex h-full items-center justify-center p-8 text-center">
      <h1 className="text-5xl font-bold">{card.front.text}</h1>
    </div>
  )
}

export default StudyFlashCardFront

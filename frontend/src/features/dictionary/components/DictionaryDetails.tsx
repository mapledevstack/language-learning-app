import type { Word } from "@/schemas/WordSchema"
import WordCard from "./WordCard"
import HandWritingCard from "./HandWritingCard"
import type { Deck } from "@/schemas/DeckSchema"

type Props = {
  isWriting: boolean
  word: Word | null
  deckIds: number[]
  decks: Deck[]
  handleAddToDeck: (deckId: number) => void
}

const DictionaryDetails = ({
  isWriting,
  word,
  deckIds,
  decks,
  handleAddToDeck,
}: Props) => {
  return (
    <div className="h-full overflow-y-auto">
      <HandWritingCard isWriting={isWriting} />
      <WordCard
        word={word}
        deckIds={deckIds}
        decks={decks}
        handleAddToDeck={handleAddToDeck}
      />
    </div>
  )
}
export default DictionaryDetails

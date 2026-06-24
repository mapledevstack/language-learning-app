import type { Word } from "@/features/dictionary/schemas/WordSchema"
import WordCard from "./WordCard"
import HandWritingCard from "./HandWritingCard"
import type { Deck } from "@/features/decks/schemas/DeckSchema"

type Props = {
  isWriting: boolean
  word: Word | null
  decks: Deck[]
  setTokens: (tokens: string[]) => void
}

const DictionaryDetails = ({ isWriting, word, decks, setTokens }: Props) => {
  return (
    <div className="h-full overflow-y-auto">
      <HandWritingCard isWriting={isWriting} setTokens={setTokens} />
      <WordCard key={word?.wordId} word={word} decks={decks} />
    </div>
  )
}
export default DictionaryDetails

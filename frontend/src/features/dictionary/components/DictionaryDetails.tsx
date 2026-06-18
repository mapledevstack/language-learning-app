import type { Word } from "@/features/dictionary/schemas/WordSchema"
import WordCard from "./WordCard"
import HandWritingCard from "./HandWritingCard"
import type { Deck } from "@/schemas/DeckSchema"

type Props = {
  isWriting: boolean
  word: Word | null
  decks: Deck[]
}

const DictionaryDetails = ({ isWriting, word, decks }: Props) => {
  return (
    <div className="h-full overflow-y-auto">
      <HandWritingCard isWriting={isWriting} />
      <WordCard key={word?.wordId} word={word} decks={decks} />
      {/* <KanjiCard kanji={example} /> */}
    </div>
  )
}
export default DictionaryDetails

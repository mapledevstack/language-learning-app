import type { Word } from "@/features/dictionary/schemas/WordSchema"
import WordCard from "./WordCard"
import HandWritingCard from "./HandWritingCard"
import EmptyCard from "@/components/cards/EmptyCard"
import { LucideSearch } from "lucide-react"

type Props = {
  isWriting: boolean
  word: Word | null
}

const DictionaryDetails = ({ isWriting, word }: Props) => {
  return (
    <div className="h-full overflow-y-auto">
      <HandWritingCard isWriting={isWriting} />

      {word ? (
        <WordCard key={word.wordId} word={word} />
      ) : (
        <EmptyCard text="Select a word" icon={LucideSearch} />
      )}
    </div>
  )
}
export default DictionaryDetails

import type { Word } from "@/features/dictionary/schemas/WordSchema"
import WordCard from "./WordCard"
import HandWritingCard from "./HandWritingCard"
import EmptyCard from "@/components/cards/EmptyCard"
import { LucideSearch } from "lucide-react"
import useDictionaryContext from "../hooks/useDictionaryContext"

type Props = {
  isWriting: boolean
  word: Word | null
}

const DictionaryDetails = ({ isWriting, word }: Props) => {
  const { setTokens } = useDictionaryContext()

  return (
    <div className="h-full overflow-y-auto">
      <HandWritingCard isWriting={isWriting} />

      {word ? (
        <WordCard key={word.wordId} word={word} onTokenSelect={setTokens} />
      ) : (
        <EmptyCard text="Select a word" icon={LucideSearch} />
      )}
    </div>
  )
}
export default DictionaryDetails

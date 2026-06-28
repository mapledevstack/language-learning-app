import type { Word } from "@/features/dictionary/schemas/WordSchema"
import WordCard from "./WordCard"
import HandWritingCard from "./HandWritingCard"

type Props = {
  isWriting: boolean
  word: Word | null
  setTokens: (tokens: string[]) => void
}

const DictionaryDetails = ({ isWriting, word, setTokens }: Props) => {
  return (
    <div className="h-full overflow-y-auto">
      <HandWritingCard isWriting={isWriting} setTokens={setTokens} />
      <WordCard key={word?.wordId} word={word} />
    </div>
  )
}
export default DictionaryDetails

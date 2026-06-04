import type { Word } from "@/schemas/WordSchema"
import WordCard from "../cards/WordCard"
import HandWritingCard from "../cards/HandWritingCard"

type Props = {
  isWriting: boolean,
  word: Word | null
}

const DictionaryDetails = ({ isWriting, word }: Props) => {
  return (
    <div className="h-full overflow-y-auto">
          <HandWritingCard isWriting={isWriting} />
          <WordCard word={word} />
    </div>
  )
}
export default DictionaryDetails

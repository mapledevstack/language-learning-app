import type { Word } from "@/schemas/WordSchema"
import Card from "./Card"

type Props = {
  word : Word
  setWord : (word : Word) => void
}

const ResultCard = ({ word, setWord } : Props) => {
  return (
    <div onClick={() => setWord(word)}>
      <Card className="bg-muted">
        <div className="font-bold text-3xl">
          {word.spellings.join("・")}
        </div>
      </Card>
    </div>
  )
}
export default ResultCard

import type { Word } from "@/schemas/WordSchema"
import Card from "./Card"

type Props = {
  word : Word
  setWord : (word : Word) => void
}

const ResultCard = ({ word, setWord } : Props) => {
  return (
    <div onClick={() => setWord(word)}>
      <Card className="bg-muted flex justify-between items-center">
        
        <div className="flex flex-col gap-2">
          <div className="text-muted-foreground">{word.readings.join("、")}</div>
          <div className="font-bold text-3xl">{word.spellings.join("・")}</div>
        </div>

        <div className="capitalize">
          {word.meanings.join(", ")}
        </div>
      
      </Card>
    </div>
  )
}
export default ResultCard

import type { Word } from "@/schemas/WordSchema"
import Card from "./Card"

type Props = {
  word : Word
  setWord : (word : Word) => void
}

const ResultCard = ({ word, setWord } : Props) => {
  return (
    <div onClick={() => setWord(word)} className="hover:scale-105 transition-transform flex h-fit">
      <Card className="bg-muted flex justify-between items-center">
        
        <div className="flex flex-col gap-2 items-center">
          <div className="text-muted-foreground">{word.readings.join("、")}</div>
          
          <div className="font-bold text-3xl">{word.spellings.join("・")}</div>
          
          <div className="capitalize text-muted-foreground">{word.meanings.join(", ")}</div>
        </div>
      
      </Card>
    </div>
  )
}
export default ResultCard

import type { Word } from "@/schemas/WordSchema"
import Card from "./Card"
import { cn } from "@/lib/utils"

type Props = {
  result : Word
  setWord : (word : Word) => void
  currentWord: Word | null
}

const ResultCard = ({ result, setWord, currentWord } : Props) => {
  return (
    <div onClick={() => setWord(result)} className="hover:scale-105 transition-transform flex h-fit">
      <Card className={cn("flex justify-between items-center", result.id === currentWord?.id ? "bg-primary text-primary-foreground" : "bg-muted") }>
        
        <div className="flex flex-col gap-2 items-center">
          <div className="text-muted-foreground">{result.readings.join("、")}</div>
          
          <div className="font-bold text-3xl">{result.spellings.join("・")}</div>
          
          <div className="capitalize text-muted-foreground">{result.meanings.join(", ")}</div>
        </div>
      
      </Card>
    </div>
  )
}
export default ResultCard

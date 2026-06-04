import type { Word } from "@/schemas-and-types/WordSchema"
import Card from "./Card"
import { LucidePlus } from "lucide-react"

type Props = {
  word: Word | null
}

const WordCard = ({ word } : Props) => {
  if(!word) return (
    <Card>{"<Word />"}</Card>
  )

  return (
    <Card className="relative flex flex-col items-center">
      
      <div className="absolute left-4 top-4 bg-primary size-10 grid place-items-center rounded-full text-primary-foreground font-bold">
        {word.jlpt}
      </div>

      <button className="absolute right-4 top-4 bg-primary size-10 grid place-items-center rounded-full text-primary-foreground hover:scale-105 cursor-pointer transition-transform">
        <LucidePlus className="size-6" />
      </button>

      <div className="mt-10 flex flex-col gap-6 items-center">
        <div className="text-4xl font-bold text-primary">
          {word.spellings.join("・")}
        </div>
        
        <div className="text-xl text-muted-foreground">
          {word.readings.join("、")}
        </div>
        
        <div className="text-lg font-medium">
          {word.meanings.join(", ")}
        </div>
        
        <div className="text-sm text-muted-foreground">
          {word.partsOfSpeech.join(", ")}
        </div>
      </div>
    </Card>
  )
}
export default WordCard

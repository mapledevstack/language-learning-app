import type { Word } from "@/features/dictionary/schemas/WordSchema"
import Card from "@/components/Card"
import { cn } from "@/lib/utils"

type Props = {
  result: Word
  setWord: (word: Word) => void
  currentWord: Word | null
}

const ResultCard = ({ result, setWord, currentWord }: Props) => {
  return (
    <div
      onClick={() => setWord(result)}
      className="hover:scale-105 transition-transform flex h-fit"
    >
      <Card
        className={cn(
          "flex justify-between items-center",
          result.wordId === currentWord?.wordId
            ? "bg-primary text-primary-foreground"
            : "bg-muted",
        )}
      >
        <div className="flex flex-col gap-2 items-center">
          <div className="text-muted-foreground">
            {result.forms.map((form) => (
              <p>{form.text}</p>
            ))}
          </div>

          <div className="font-bold text-3xl">
            {result.forms.map((form) => (
              <p>{form.reading}</p>
            ))}
          </div>

          <div className="capitalize text-muted-foreground">
            {result.meanings.map((meaning) => (
              <p>{meaning.definitions.join(", ")}</p>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
export default ResultCard

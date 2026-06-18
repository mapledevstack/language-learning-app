import type { Word } from "@/features/dictionary/schemas/WordSchema"
import Card from "@/components/Card"
import { cn } from "@/lib/utils"
import KanjiKanaWord from "./KanjiKanaWord"

type Props = {
  result: Word
  currentWord: Word | null
  setWord: (word: Word) => void
}

const ResultCard = ({ result, currentWord, setWord }: Props) => {
  return (
    <div
      onClick={() => setWord(result)}
      className="hover:scale-105 transition-all flex h-fit"
    >
      <Card
        className={cn(
          "flex justify-between items-center transition-all gap-2 flex-col w-fit max-w-full",
          result.wordId === currentWord?.wordId
            ? "bg-primary text-primary-foreground"
            : "bg-muted hover:bg-sidebar-primary/50",
        )}
      >
        <div className="font-bold text-3xl whitespace-nowrap">
          <KanjiKanaWord
            form={result.forms[0]}
            furiganaClassName={
              result.wordId === currentWord?.wordId
                ? "text-sidebar-primary-foreground"
                : "transition-colors"
            }
          />
        </div>

        {result.meanings.map((meaning, index) => (
          <p
            key={index}
            className="capitalize text-muted-foreground tracking-wider max-w-3xs line-clamp-2"
          >
            {meaning.definitions.join(", ")}
          </p>
        ))}
      </Card>
    </div>
  )
}
export default ResultCard

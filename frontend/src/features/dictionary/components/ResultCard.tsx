import type { Word } from "@/features/dictionary/schemas/WordSchema"
import Card from "@/components/cards/Card"
import { cn } from "@/utils/cn"
import KanjiKanaWord from "./KanjiKanaWord"

type Props = {
  result: Word
  currentWord: Word | null
  setWord: (word: Word) => void
}

const ResultCard = ({ result, currentWord, setWord }: Props) => {
  const isSelected = result.wordId === currentWord?.wordId

  return (
    <button
      type="button"
      onClick={() => setWord(result)}
      className="hover:scale-105 transition-all flex h-fit"
    >
      <Card
        className={cn(
          "flex justify-between items-center transition-all gap-2 flex-col w-fit max-w-full",
          isSelected
            ? "bg-primary text-primary-foreground"
            : "bg-muted hover:bg-sidebar-primary/50",
        )}
      >
        <div className="font-bold text-3xl whitespace-nowrap">
          <KanjiKanaWord
            form={result.forms[0]}
            furiganaClassName={
              isSelected
                ? "text-sidebar-primary-foreground"
                : "transition-colors"
            }
          />
        </div>

        <div className="line-clamp-1">
          {result.meanings.map((meaning, index) => (
            <p
              key={index}
              className="capitalize text-muted-foreground tracking-wider max-w-3xs"
            >
              {meaning.definitions.join(", ")}
            </p>
          ))}
        </div>
      </Card>
    </button>
  )
}
export default ResultCard

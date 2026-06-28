import type { Word } from "@/features/dictionary/schemas/WordSchema"
import Card from "@/components/cards/Card"
import ResultCard from "./ResultCard"
import { useEffect } from "react"
import EmptyCard from "@/components/cards/EmptyCard"

type Props = {
  currentWord: Word | null
  results: Word[]
  setWord: (word: Word) => void
}

const DictionaryResults = ({ currentWord, results, setWord }: Props) => {
  // auto select first result
  useEffect(() => {
    setWord(results[0] ?? null)
  }, [results])

  if (results.length === 0) return <EmptyCard text="No results found" />

  return (
    <Card className="h-full flex flex-wrap justify-center gap-5 overflow-y-auto overflow-x-hidden content-start">
      {results.map((res) => (
        <ResultCard
          key={res.wordId}
          result={res}
          currentWord={currentWord}
          setWord={setWord}
        />
      ))}
    </Card>
  )
}
export default DictionaryResults

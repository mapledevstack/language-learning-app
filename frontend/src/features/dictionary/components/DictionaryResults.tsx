import type { Word } from "@/features/dictionary/schemas/WordSchema"
import Card from "@/components/Card"
import ResultCard from "./ResultCard"

type Props = {
  currentWord: Word | null
  results: Word[] | []
  setWord: (word: Word) => void
}

const DictionaryResults = ({ currentWord, results, setWord }: Props) => {
  if (results.length === 0) return <Card>No Results...</Card>

  return (
    <Card className="h-full flex flex-wrap justify-center gap-5 overflow-y-auto overflow-x-hidden content-start">
      {results.map((res) => {
        return (
          <ResultCard
            key={res.wordId}
            result={res}
            currentWord={currentWord}
            setWord={setWord}
          />
        )
      })}
    </Card>
  )
}
export default DictionaryResults

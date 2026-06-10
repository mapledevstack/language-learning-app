import type { Word } from "@/schemas/WordSchema"
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
    <Card className="h-full flex flex-wrap justify-center gap-5 overflow-y-auto overflow-x-hidden">
      {results.map((res) => {
        return (
          <ResultCard
            key={res.id}
            result={res}
            setWord={setWord}
            currentWord={currentWord}
          />
        )
      })}
    </Card>
  )
}
export default DictionaryResults

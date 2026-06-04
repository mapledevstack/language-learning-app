import type { Word } from "@/schemas-and-types/WordSchema"
import Card from "../cards/Card"
import ResultCard from "../cards/ResultCard"

type Props = {
  results: Word[] | []
  setWord: (word : Word) => void
}

const DictionaryResults = ({ results, setWord } : Props) => {
  if(results.length === 0) return (
    <Card>
      No Results...
    </Card>
  )

  return (
    <Card className="h-full flex flex-wrap justify-center gap-5 overflow-y-auto overflow-x-hidden">
      {results.map((res) => {
        return (
          <ResultCard key={res.id} word={res} setWord={setWord} />
        )
      })}
    </Card>
  )
}
export default DictionaryResults

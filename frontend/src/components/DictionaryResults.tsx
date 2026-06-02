import type { Word } from "@/schemas/WordSchema"
import Card from "./cards/Card"
import ResultCard from "./cards/ResultCard"

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
    <Card className="flex flex-col gap-4 md:h-full md:overflow-y-auto">
      {results.map((res) => {
        return (
          <ResultCard key={res.id} word={res} setWord={setWord} />
        )
      })}
    </Card>
  )
}
export default DictionaryResults

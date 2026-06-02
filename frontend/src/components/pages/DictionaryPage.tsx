import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import WordCard from "../cards/WordCard"
import DictionaryResults from "../DictionaryResults"
import { useState, type ChangeEvent } from "react"
import type { Word } from "@/schemas/WordSchema"

const DictionaryPage = () => {
  const [query, setQuery] = useState("")
  const [word, setWord] = useState<Word | null>(null)
  const [results, setResults] = useState<Word[]>([])

  const handleQuery = (e : ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const query = e.target.value
    
    const results = filterWords(query)

    setResults(results)
    setWord(results[0] ?? null)
    setQuery(query)
  }

  const filterWords = (query : string) => {
    const results = words.filter(word => {
      return (
        word.spellings.some(spelling => spelling.includes(query))
        || word.readings.some(reading => reading.includes(query))
        || word.meanings.some(meaning => meaning.toLowerCase().includes(query.toLowerCase()))
      )
    })

    return results
  }

  return (
    <div className="h-full flex flex-col p-10">
      
      <section className="flex pl-10 pr-10 pb-10 justify-center">
        <InputGroup className="size-14 w-full max-w-5xl">
          <InputGroupInput placeholder="Search for a Word, Kanji, or Sentence..." value={query} onChange={handleQuery} />
          <InputGroupAddon>
            <Search className="text-primary" />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end"><p className="text-primary">{results.length}</p> results</InputGroupAddon>
        </InputGroup>
      </section>

      <section className="flex-1 md:min-h-0 grid md:grid-cols-[30%_70%] gap-4 items-start">
        <div className="h-full md:overflow-y-auto">
          <WordCard word={word} />
        </div>
        <DictionaryResults results={results} setWord={setWord} />
      </section>
    
    </div>
  )
}
export default DictionaryPage


const words = [
  {
    id: 1000290,
    spellings: ["食べる"],
    readings: ["たべる"],
    meanings: ["to eat"],
    partsOfSpeech: ["Ichidan verb"],
    jlpt: "N5"
  },
  {
    id: 1000310,
    spellings: ["猫"],
    readings: ["ねこ"],
    meanings: ["cat"],
    partsOfSpeech: ["Noun"],
    jlpt: "N5"
  },
  {
    id: 1000320,
    spellings: ["学校"],
    readings: ["がっこう"],
    meanings: ["school"],
    partsOfSpeech: ["Noun"],
    jlpt: "N5"
  },
  {
    id: 1000330,
    spellings: ["面白い"],
    readings: ["おもしろい"],
    meanings: ["interesting", "funny"],
    partsOfSpeech: ["I-adjective"],
    jlpt: "N5"
  },
  {
    id: 1000340,
    spellings: ["勉強する"],
    readings: ["べんきょうする"],
    meanings: ["to study"],
    partsOfSpeech: ["Suru verb"],
    jlpt: "N5"
  },
  {
    id: 1000350,
    spellings: ["勉強する"],
    readings: ["べんきょうする"],
    meanings: ["to study"],
    partsOfSpeech: ["Suru verb"],
    jlpt: "N5"
  },
  {
    id: 1000360,
    spellings: ["勉強する"],
    readings: ["べんきょうする"],
    meanings: ["to study"],
    partsOfSpeech: ["Suru verb"],
    jlpt: "N5"
  },
  {
    id: 1000370,
    spellings: ["勉強する"],
    readings: ["べんきょうする"],
    meanings: ["to study"],
    partsOfSpeech: ["Suru verb"],
    jlpt: "N5"
  }
]

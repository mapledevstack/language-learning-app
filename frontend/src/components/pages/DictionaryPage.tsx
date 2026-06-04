import DictionaryResults from "../dictionary/DictionaryResults"
import { useEffect, useState } from "react"
import type { Word } from "@/schemas-and-types/WordSchema"
import DictionaryDetails from "../dictionary/DictionaryDetails"
import DictionarySearch from "../dictionary/DictionarySearch"

const DictionaryPage = () => {
  const [query, setQuery] = useState<string>("")
  const [word, setWord] = useState<Word | null>(null)
  const [isWriting, setIsWriting] = useState<boolean>(false)

  const filterResults = (query: string, words: Word[]) => {
    const newWords = words.filter(word => (
      word.spellings.some(spelling => spelling.includes(query))
      || word.readings.some(reading => reading.includes(query))
      || word.meanings.some(meaning => meaning.toLowerCase().includes(query.toLowerCase()))
    ))

    return newWords
  }

  const results = query ? filterResults(query, words) : []

  useEffect(() => {
    query ? setWord(results[0] ?? null) : setWord(null)
  }, [query])

  return (
    <div className="h-full flex flex-col p-10 gap-10">
      
      <section>
        <DictionarySearch results={results} isWriting={isWriting} setIsWriting={setIsWriting} query={query} setQuery={setQuery} />
      </section>

      <section className="flex-1 md:min-h-0 grid md:grid-cols-[30%_70%] gap-4 items-start">
        <DictionaryDetails isWriting={isWriting} word={word} />
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
  },
  {
    id: 2000310,
    spellings: ["猫"],
    readings: ["ねこ"],
    meanings: ["cat"],
    partsOfSpeech: ["Noun"],
    jlpt: "N5"
  },
  {
    id: 2000320,
    spellings: ["学校"],
    readings: ["がっこう"],
    meanings: ["school"],
    partsOfSpeech: ["Noun"],
    jlpt: "N5"
  },
  {
    id: 2000330,
    spellings: ["面白い"],
    readings: ["おもしろい"],
    meanings: ["interesting", "funny"],
    partsOfSpeech: ["I-adjective"],
    jlpt: "N5"
  },
  {
    id: 2000340,
    spellings: ["勉強する"],
    readings: ["べんきょうする"],
    meanings: ["to study"],
    partsOfSpeech: ["Suru verb"],
    jlpt: "N5"
  },
  {
    id: 3000350,
    spellings: ["勉強する"],
    readings: ["べんきょうする"],
    meanings: ["to study"],
    partsOfSpeech: ["Suru verb"],
    jlpt: "N5"
  },
  {
    id: 3000360,
    spellings: ["勉強する"],
    readings: ["べんきょうする"],
    meanings: ["to study"],
    partsOfSpeech: ["Suru verb"],
    jlpt: "N5"
  },
  {
    id: 3000370,
    spellings: ["勉強する"],
    readings: ["べんきょうする"],
    meanings: ["to study"],
    partsOfSpeech: ["Suru verb"],
    jlpt: "N5"
  },
  {
    id: 3000310,
    spellings: ["猫"],
    readings: ["ねこ"],
    meanings: ["cat"],
    partsOfSpeech: ["Noun"],
    jlpt: "N5"
  },
  {
    id: 3000320,
    spellings: ["学校"],
    readings: ["がっこう"],
    meanings: ["school"],
    partsOfSpeech: ["Noun"],
    jlpt: "N5"
  },
  {
    id: 3000330,
    spellings: ["面白い"],
    readings: ["おもしろい"],
    meanings: ["interesting", "funny"],
    partsOfSpeech: ["I-adjective"],
    jlpt: "N5"
  },
  {
    id: 3000340,
    spellings: ["勉強する"],
    readings: ["べんきょうする"],
    meanings: ["to study"],
    partsOfSpeech: ["Suru verb"],
    jlpt: "N5"
  }
]

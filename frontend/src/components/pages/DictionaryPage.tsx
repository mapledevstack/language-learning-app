import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import DictionaryWord from "../DictionaryWord"
import DictionaryResults from "../DictionaryResults"
import { useState } from "react"

const DictionaryPage = () => {
  const [query, setQuery] = useState("")
  const [word, setWord] = useState({})
  const [results, setResults] = useState([])

  return (
    <div className="h-full flex flex-col p-10">
      
      <section className="flex pl-10 pr-10 pb-10 justify-center">
        <InputGroup className="size-14 w-full max-w-5xl">
          <InputGroupInput placeholder="Search for a Word, Kanji, or Sentence..." />
          <InputGroupAddon>
            <Search className="text-primary" />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end"><p className="text-primary">{results.length}</p> results</InputGroupAddon>
        </InputGroup>
      </section>

      <section className="grid md:grid-cols-[30%_70%]">
        <DictionaryWord word={words[0]} />
        <DictionaryResults />
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
  }
]

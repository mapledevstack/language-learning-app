import DictionaryDetails from '@/components/dictionary/DictionaryDetails'
import DictionaryResults from '@/components/dictionary/DictionaryResults'
import DictionarySearch from '@/components/dictionary/DictionarySearch'
import { DeckSchema, type Deck } from '@/schemas/DeckSchema'
import type { Word } from '@/schemas/WordSchema'
import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/_app/dictionary')({
  component: DictionaryPage,
})

function DictionaryPage() {
  const [query, setQuery] = useState<string>("")
  const [word, setWord] = useState<Word | null>(null)
  const [isWriting, setIsWriting] = useState<boolean>(false)

  const deckIds = [...new Set(decks.map(deck => deck.id))]

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

  const handleAddToDeck = (deckId: number) => {
    console.log(`Added ${word?.readings} to ${decks.find(deck => deck.id === deckId)?.title}`)
  }

  return (
    <div className="h-full flex flex-col p-10 gap-6">
      
      <section>
        <DictionarySearch results={results} isWriting={isWriting} setIsWriting={setIsWriting} query={query} setQuery={setQuery} />
      </section>

      <section className="flex-1 md:min-h-0 grid md:grid-cols-[3fr_7fr] gap-4 items-start">
        <DictionaryDetails isWriting={isWriting} word={word} deckIds={deckIds} decks={decks} handleAddToDeck={handleAddToDeck} />
        <DictionaryResults currentWord={word} results={results} setWord={setWord} />
      </section>
    
    </div>
  )
}

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

const decks: Deck[] = 
  [
    DeckSchema.parse({
      id: 1,
      title: "Hiragana",
      description: "Basic Japanese syllabary",
      cardCount: 46,
      learnedCount: 23,
      dueCount: 26,
    }),

    DeckSchema.parse({
      id: 2,
      title: "Katakana",
      description: "Foreign-word syllabary",
      cardCount: 46,
      learnedCount: 2,
      dueCount: 46,
    })
  ]

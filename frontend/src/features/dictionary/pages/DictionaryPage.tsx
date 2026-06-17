import { useEffect, useState } from "react"
import DictionaryDetails from "../components/DictionaryDetails"
import DictionaryResults from "../components/DictionaryResults"
import DictionarySearch from "../components/DictionarySearch"
import type { Word } from "@/features/dictionary/schemas/WordSchema"
import { DeckSchema, type Deck } from "@/schemas/DeckSchema"

const DictionaryPage = () => {
  const [query, setQuery] = useState<string>("f")
  const [word, setWord] = useState<Word | null>(null)
  const [isWriting, setIsWriting] = useState<boolean>(false)

  const filterResults = (query: string, words: Word[]) => {
    const newWords = words.filter(
      (word) =>
        // word.spellings.some((spelling) => spelling.includes(query)) ||
        // word.readings.some((reading) => reading.includes(query)) ||
        // word.meanings.some((meaning) =>
        //   meaning.toLowerCase().includes(query.toLowerCase()),
        // ),
        word,
    )

    return newWords
  }

  const results = query ? filterResults(query, words) : []

  useEffect(() => {
    query ? setWord(results[0] ?? null) : setWord(null)
  }, [query])

  return (
    <div className="h-full flex flex-col p-10 gap-6">
      <section>
        <DictionarySearch
          results={results}
          isWriting={isWriting}
          setIsWriting={setIsWriting}
          query={query}
          setQuery={setQuery}
        />
      </section>

      <section className="flex-1 md:min-h-0 grid md:grid-cols-[3fr_7fr] gap-4 items-start">
        <DictionaryDetails isWriting={isWriting} word={word} decks={decks} />
        <DictionaryResults
          currentWord={word}
          results={results}
          setWord={setWord}
        />
      </section>
    </div>
  )
}

export default DictionaryPage

const decks: Deck[] = [
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
  }),
]

const words: Word[] = [
  {
    wordId: "1000040",
    forms: [
      {
        text: "〃",
        reading: "おなじ",
        furigana: [
          {
            text: "〃",
            reading: "おなじ",
          },
        ],
        common: false,
        tags: [],
        pitchAccent: "LHHH",
      },
    ],
    meanings: [
      {
        definitions: ["ditto mark"],
        partsOfSpeech: ["n"],
        tags: [],
        notes: [],
      },
    ],
  },

  {
    wordId: "1000110",
    forms: [
      {
        text: "ＣＤプレーヤー",
        reading: "シーディープレーヤー",
        furigana: [
          {
            text: "Ｃ",
            reading: "シー",
          },
          {
            text: "Ｄ",
            reading: "ディー",
          },
          {
            text: "プレーヤー",
            reading: null,
          },
        ],
        common: true,
        tags: [],
        pitchAccent: "LHHhHHLLLLL",
      },
      {
        text: "ＣＤプレイヤー",
        reading: "シーディープレイヤー",
        furigana: [
          {
            text: "Ｃ",
            reading: "シー",
          },
          {
            text: "Ｄ",
            reading: "ディー",
          },
          {
            text: "プレイヤー",
            reading: null,
          },
        ],
        common: false,
        tags: [],
        pitchAccent: null,
      },
    ],
    meanings: [
      {
        definitions: ["CD player", "amamamamamama", "Insane omg"],
        partsOfSpeech: ["n"],
        tags: [],
        notes: [],
      },
    ],
  },

  {
    wordId: "1000420",
    forms: [
      {
        text: "彼の",
        reading: "あの",
        furigana: [
          {
            text: "彼",
            reading: "あ",
          },
          {
            text: "の",
            reading: null,
          },
        ],
        common: false,
        tags: ["rK"],
        pitchAccent: "LHH",
      },
      {
        text: "あん",
        reading: "あん",
        furigana: [],
        common: false,
        tags: [],
        pitchAccent: "HLL",
      },
    ],
    meanings: [
      {
        definitions: ["that", "those", "the", "Insane omg"],
        partsOfSpeech: ["adj-pn"],
        tags: ["uk"],
        notes: [
          "someone or something distant from both speaker and listener, or situation unfamiliar to both speaker and listener",
        ],
      },
    ],
  },
]

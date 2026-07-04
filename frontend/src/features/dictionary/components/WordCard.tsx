import type { Word } from "@/features/dictionary/schemas/WordSchema"
import Card from "@/components/cards/Card"
import { DeckSchema, type Deck } from "@/features/decks/schemas/DeckSchema"
import { useState } from "react"
import KanjiKanaWord from "./KanjiKanaWord"
import useKanji from "../hooks/useKanji"
import KanjiCard from "./KanjiCard"
import useSentences from "../hooks/useSentences"
import ExampleSentences from "./ExampleSentences"
import WordFormTabs from "./WordFormTabs"
import AddToDeckButton from "./AddToDeckButton"
import KanjiTabs from "./KanjiTabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import tags from "@/constants/tags"

type Props = {
  word: Word
  onTokenSelect?: (tokens: string[]) => void
}

const WordCard = ({ word, onTokenSelect }: Props) => {
  const [formIndex, setFormIndex] = useState(0)
  const [kanjiIndex, setKanjiIndex] = useState(0)

  const handleAddToDeck = (deckId: number) => {
    console.log(
      `Added ${word.forms[formIndex].text} to ${decks.find((deck) => deck.id === deckId)?.title}`,
    )
  }

  const selectedWordForm = word.forms[formIndex]

  const { data: sentences = [] } = useSentences(selectedWordForm.text, 3)
  const { data: kanjisGroup = [] } = useKanji(word)

  const selectedKanjis = (kanjisGroup[formIndex] ?? []).filter(
    (kanji) => kanji !== undefined,
  )
  const selectedKanji = selectedKanjis[kanjiIndex]

  return (
    <Card className="flex flex-col items-center overflow-x-hidden gap-4">
      <WordFormTabs
        forms={word.forms}
        formIndex={formIndex}
        onSelect={(index) => {
          setFormIndex(index)
          setKanjiIndex(0)
        }}
      />

      <div className="w-full bg-accent p-2 rounded-md text-center">
        <div className="text-4xl">
          <KanjiKanaWord form={selectedWordForm} />
        </div>

        {selectedWordForm.tags.length > 0 && (
          <div className="italic">
            {selectedWordForm.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}

        {selectedWordForm.pitchAccent && (
          <div className="">{selectedWordForm.pitchAccent}</div>
        )}
      </div>

      <AddToDeckButton handleAddToDeck={handleAddToDeck} />

      <div className="bg-accent w-full p-4 rounded-md">
        <ol className="space-y-4">
          {word.meanings.map((meaning, index) => (
            <li key={index} className="space-y-4">
              <div className="font-medium">
                {index + 1}. {meaning.definitions.join(" ; ")}
              </div>

              {meaning.partsOfSpeech.length > 0 && (
                <div className="text-sm text-sidebar-primary-foreground text-center w-fit rounded-lg p-2 mx-auto font-bold gap-2 flex flex-wrap justify-center">
                  {meaning.partsOfSpeech.map((pos) => (
                    <div
                      className="flex items-center bg-sidebar-primary p-1 rounded-lg text-sm font-bold text-card-foreground"
                      key={pos}
                    >
                      <Tooltip key={pos}>
                        <TooltipTrigger>{pos}</TooltipTrigger>
                        <TooltipContent>
                          <p>{tags[pos] ?? pos}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              )}

              {meaning.notes.length > 0 && (
                <div className="text-sm italic text-muted-foreground">
                  {meaning.notes.join(", ")}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      {selectedKanjis.length > 0 && (
        <KanjiTabs
          selectedKanjis={selectedKanjis}
          kanjiIndex={kanjiIndex}
          setKanjiIndex={setKanjiIndex}
        />
      )}
      {selectedKanji && (
        <KanjiCard key={selectedKanji._id} kanji={selectedKanji} />
      )}

      {sentences.length > 0 && (
        <ExampleSentences sentences={sentences} onTokenSelect={onTokenSelect} />
      )}
    </Card>
  )
}
export default WordCard

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

import type { Word } from "@/features/dictionary/schemas/WordSchema"
import Card from "@/components/cards/Card"
import { LucidePlus, LucideSearch } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeckSchema, type Deck } from "@/features/decks/schemas/DeckSchema"
import { useState } from "react"
import { cn } from "@/utils/cn"
import KanjiKanaWord from "./KanjiKanaWord"
import useKanji from "../hooks/useKanji"
import KanjiCard from "./KanjiCard"
import useSentences from "../hooks/useSentences"
import ExampleSentences from "./ExampleSentences"
import WordFormTabs from "./WordFormTabs"
import AddToDeckButton from "./AddToDeckButton"
import KanjiTabs from "./KanjiTabs"

type Props = {
  word: Word
}

const WordCard = ({ word }: Props) => {
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

        {selectedWordForm?.pitchAccent && (
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
                <div className="text-sm text-sidebar-primary-foreground text-center bg-sidebar-primary w-fit rounded-lg p-2 mx-auto font-bold">
                  {meaning.partsOfSpeech.join(", ")}
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

      <ExampleSentences sentences={sentences} />

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

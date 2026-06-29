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
import { useNavigate } from "@tanstack/react-router"
import { DeckSchema, type Deck } from "@/features/decks/schemas/DeckSchema"
import { useState } from "react"
import { cn } from "@/utils/cn"
import KanjiKanaWord from "./KanjiKanaWord"
import useKanji from "../hooks/useKanji"
import KanjiCard from "./KanjiCard"
import EmptyCard from "@/components/cards/EmptyCard"
import useSentences from "../hooks/useSentences"
import ExampleSentences from "./ExampleSentences"

type Props = {
  word: Word | null
}

const WordCard = ({ word }: Props) => {
  const navigate = useNavigate()
  const [formIndex, setFormIndex] = useState(0)
  const [kanjiIndex, setKanjiIndex] = useState(0)

  if (!word) return <EmptyCard text="Select a word" icon={LucideSearch} />

  const handleAddToDeck = (deckId: number) => {
    console.log(
      `Added ${word?.forms[formIndex].text} to ${decks.find((deck) => deck.id === deckId)?.title}`,
    )
  }

  const { data: kanjisGroup = [] } = useKanji(word)

  const selectedWordForm = word.forms[formIndex]
  const { data: sentences = [] } = useSentences(selectedWordForm.text, 3)
  const selectedKanjis = kanjisGroup[formIndex] ?? []
  const selectedKanji = selectedKanjis[kanjiIndex]

  return (
    <Card className="flex flex-col items-center overflow-x-hidden gap-4">
      <div className="w-full flex gap-2 border p-2 rounded-md bg-accent overflow-x-auto whitespace-nowrap justify-center ">
        {word.forms.map((form, index) => (
          <div
            key={index}
            className={cn(
              "p-2 rounded-md border border-primary text-sm font-bold text-card-foreground transition-colors cursor-pointer",
              formIndex === index
                ? "bg-sidebar-primary"
                : "hover:bg-sidebar-primary/30",
            )}
            onClick={() => {
              setFormIndex(index)
              setKanjiIndex(0)
            }}
          >
            {form.text}
          </div>
        ))}
      </div>

      <div className="w-full bg-accent p-2 rounded-md text-center">
        <div className="text-4xl">
          <KanjiKanaWord form={selectedWordForm} />
        </div>

        {selectedWordForm?.tags && (
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            className="right-4 top-4 bg-primary size-10 grid place-items-center w-full rounded-xl text-primary-foreground hover:scale-105 cursor-pointer transition-transform"
          >
            <LucidePlus className="size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Add to a Deck...</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {decks.map((deck) => (
              <DropdownMenuItem
                key={deck.id}
                onClick={() => handleAddToDeck(deck.id)}
              >
                {deck.title}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-muted-foreground"
              onClick={() => navigate({ to: "/decks" })}
            >
              Manage decks
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

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
        <div className="w-full flex gap-2 border p-2 rounded-md bg-accent overflow-x-auto whitespace-nowrap justify-center">
          {selectedKanjis.map((kanji, index) => (
            <div
              key={index}
              className={cn(
                "p-2 rounded-md border border-primary text-sm font-bold text-card-foreground transition-colors cursor-pointer",
                kanjiIndex === index
                  ? "bg-sidebar-primary"
                  : "hover:bg-sidebar-primary/30",
              )}
              onClick={() => setKanjiIndex(index)}
            >
              {kanji?.kanji}
            </div>
          ))}
        </div>
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

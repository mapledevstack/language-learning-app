import type { Word } from "@/schemas/WordSchema"
import Card from "@/components/Card"
import { LucidePlus } from "lucide-react"
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
import type { Deck } from "@/schemas/DeckSchema"

type Props = {
  word: Word | null
  decks: Deck[]
}

const WordCard = ({ word, decks }: Props) => {
  const navigate = useNavigate()

  const handleAddToDeck = (deckId: number) => {
    console.log(
      `Added ${word?.readings} to ${decks.find((deck) => deck.id === deckId)?.title}`,
    )
  }

  if (!word) return <Card>{"<Word />"}</Card>

  return (
    <Card className="relative flex flex-col items-center">
      <div className="absolute left-4 top-4 bg-primary size-10 grid place-items-center rounded-full text-primary-foreground font-bold">
        {word.jlpt}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            className="absolute right-4 top-4 bg-primary size-10 grid place-items-center rounded-full text-primary-foreground hover:scale-105 cursor-pointer transition-transform"
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

      <div className="mt-10 flex flex-col gap-6 items-center">
        <div className="text-4xl font-bold text-primary">
          {word.spellings.join("・")}
        </div>

        <div className="text-xl text-muted-foreground">
          {word.readings.join("、")}
        </div>

        <div className="text-lg font-medium">{word.meanings.join(", ")}</div>

        <div className="text-sm text-muted-foreground">
          {word.partsOfSpeech.join(", ")}
        </div>
      </div>
    </Card>
  )
}
export default WordCard

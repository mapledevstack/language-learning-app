import type { Word } from "@/features/dictionary/schemas/WordSchema"
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
import { useState } from "react"

type Props = {
  word: Word | null
  decks: Deck[]
}

const WordCard = ({ word, decks }: Props) => {
  const navigate = useNavigate()
  const [form, setForm] = useState(null)

  // const handleAddToDeck = (deckId: number) => {
  //   console.log(
  //     `Added ${word?.readings} to ${decks.find((deck) => deck.id === deckId)?.title}`,
  //   )
  // }

  if (!word) return <Card>{"<Word />"}</Card>

  return (
    <Card className="relative flex flex-col items-center">
      {/* <DropdownMenu>
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
      </DropdownMenu> */}

      <div className="w-full flex flex-col gap-6 items-center">
        <div className="w-full flex flex-row">
          <div className="text-4xl font-bold text-primary">
            {word.forms.map((form) => (
              <p>{form.text}</p>
            ))}
          </div>
        </div>

        <div className="text-lg font-medium">
          {word.meanings.map((meaning) => (
            <p>{meaning.definitions}</p>
          ))}
        </div>
      </div>
    </Card>
  )
}
export default WordCard

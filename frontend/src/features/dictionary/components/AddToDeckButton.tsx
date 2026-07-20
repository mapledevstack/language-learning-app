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
import { LucidePlus } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import useDecks from "@/features/decks/hooks/useDecks"
import type { Word } from "../schemas/WordSchema"
import { useState } from "react"
import FlashCardDialog from "./FlashCardDialog"

type Props = {
  word: Word
}

const AddToDeckButton = ({ word }: Props) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [selectedDeckId, setSelectedDeckId] = useState("")

  const { data: decks = [] } = useDecks()

  const handleDeckSelect = (deckId: string) => {
    setSelectedDeckId(deckId)
    setOpen(true)
  }

  return (
    <>
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
                onClick={() => handleDeckSelect(deck.id)}
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

      <FlashCardDialog
        open={open}
        onOpenChange={setOpen}
        word={word}
        deckId={selectedDeckId}
      />
    </>
  )
}

export default AddToDeckButton

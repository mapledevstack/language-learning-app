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

type Props = {
  handleAddToDeck: (deckId: string) => void
}

const AddToDeckButton = ({ handleAddToDeck }: Props) => {
  const navigate = useNavigate()

  const { data: decks = [] } = useDecks()

  return (
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
  )
}

export default AddToDeckButton

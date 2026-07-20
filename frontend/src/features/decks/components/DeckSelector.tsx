import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useDecks from "../hooks/useDecks"
import { useNavigate } from "@tanstack/react-router"

const DeckSelector = () => {
  const { data: decks = [] } = useDecks()
  const navigate = useNavigate()

  return (
    <Select
      onValueChange={(deckId) =>
        navigate({
          to: "/decks/$deckId/edit",
          params: { deckId },
        })
      }
    >
      <SelectTrigger className="w-full bg-primary text-primary-foreground tracking-widest font-bold">
        <SelectValue placeholder="Select a Deck to Edit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {decks.map((deck) => (
            <SelectItem key={deck.id} value={deck.id}>
              {deck.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
export default DeckSelector

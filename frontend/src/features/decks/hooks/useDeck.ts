import { useQuery } from "@tanstack/react-query"
import { getDeck } from "../api/decksApi"

const useDeck = (deckId: string) => {
  return useQuery({
    queryKey: ["decks", deckId],
    queryFn: () => getDeck(deckId),
  })
}

export default useDeck

import { useQuery } from "@tanstack/react-query"
import { getDueFlashCards } from "../api/flashcardsApi"

const useDueFlashCards = (deckId: string) => {
  return useQuery({
    queryKey: ["flashcards", deckId],
    queryFn: () => getDueFlashCards(deckId),
  })
}

export default useDueFlashCards

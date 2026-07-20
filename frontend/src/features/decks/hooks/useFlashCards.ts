import { useQuery } from "@tanstack/react-query"
import { getFlashCards } from "../api/flashcardsApi"

const useFlashCards = (deckId: string) => {
  return useQuery({
    queryKey: ["flashcards", deckId],
    queryFn: () => getFlashCards(deckId),
  })
}

export default useFlashCards

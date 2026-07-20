import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteFlashCard } from "../api/flashcardsApi"

const useDeleteFlashCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ flashCardId }: { flashCardId: string; deckId: string }) =>
      deleteFlashCard(flashCardId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["flashcards", variables.deckId],
      })
    },
  })
}

export default useDeleteFlashCard

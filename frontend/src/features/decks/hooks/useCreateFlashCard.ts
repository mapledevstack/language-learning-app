import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createFlashCard } from "../api/flashcardsApi"

const useCreateFlashCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createFlashCard,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["flashcards"],
      })
    },
  })
}

export default useCreateFlashCard

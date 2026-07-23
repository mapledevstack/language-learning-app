import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Rating } from "ts-fsrs"
import { reviewFlashCard } from "../api/flashcardsApi"

const useReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      flashCardId,
      rating,
    }: {
      flashCardId: string
      rating: Rating
    }) => reviewFlashCard(flashCardId, rating),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dueFlashCards"],
      })

      queryClient.invalidateQueries({
        queryKey: ["deckStats"],
      })
    },
  })
}

export default useReview

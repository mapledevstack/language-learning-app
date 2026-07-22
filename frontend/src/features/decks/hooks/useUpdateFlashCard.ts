import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateFlashCard } from "../api/flashcardsApi"
import type { UpdateFlashCardSchema } from "../schemas/FlashCardSchema"

const useUpdateFlashCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      flashCardId,
      ...data
    }: {
      flashCardId: string
    } & UpdateFlashCardSchema) => updateFlashCard(flashCardId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["flashcards"],
      })
    },
  })
}

export default useUpdateFlashCard

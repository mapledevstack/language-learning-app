import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateDeck } from "../api/decksApi"
import type { UpdateDeckInput } from "../schemas/DeckSchema"

const useUpdateDeck = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      deckId,
      input,
    }: {
      deckId: string
      input: UpdateDeckInput
    }) => updateDeck(deckId, input),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["deck", variables.deckId],
      })

      queryClient.invalidateQueries({
        queryKey: ["decks"],
      })
    },
  })
}

export default useUpdateDeck

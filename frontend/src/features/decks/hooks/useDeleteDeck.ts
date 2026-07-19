import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteDeck } from "../api/decksApi"

const useDeleteDeck = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteDeck,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["decks"],
      })
    },
  })
}

export default useDeleteDeck

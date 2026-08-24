import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteDeck } from "../api/decksApi"
import { toast } from "sonner"

const useDeleteDeck = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteDeck,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["decks"],
      })
    },

    onError: () => {
      toast.info("Cannot delete decks in Demo mode")
    },
  })
}

export default useDeleteDeck

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createDeck } from "../api/decksApi"
import { toast } from "sonner"

export function useCreateDeck() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createDeck,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["decks"],
      })
    },

    onError: () => {
      toast.info("Cannot create Decks in Demo mode")
    },
  })
}

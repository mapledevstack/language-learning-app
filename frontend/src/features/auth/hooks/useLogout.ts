import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout } from "../api/authApi"
import { useNavigate } from "@tanstack/react-router"

const useLogout = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["auth", "me"],
      })

      queryClient.removeQueries({
        queryKey: ["user-activity"],
      })

      queryClient.removeQueries({
        queryKey: ["decks"],
      })

      queryClient.removeQueries({
        queryKey: ["deckStats"],
      })

      navigate({ to: "/" })
    },
  })
}

export default useLogout

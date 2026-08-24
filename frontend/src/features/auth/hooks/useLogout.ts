import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout } from "../api/authApi"
import { useNavigate } from "@tanstack/react-router"

const useLogout = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
      })

      navigate({ to: "/" })
    },
  })
}

export default useLogout

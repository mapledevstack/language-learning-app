import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "../api/authApi"

const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
      })
    },
  })
}

export default useUpdateUser

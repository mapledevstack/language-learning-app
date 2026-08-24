import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { demoLogin } from "../api/authApi"

const useDemoUser = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: demoLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-activity"],
      })

      navigate({ to: "/dashboard", replace: true })
    },
  })
}

export default useDemoUser

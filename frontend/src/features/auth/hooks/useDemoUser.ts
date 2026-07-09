import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { demoLogin } from "../api/authApi"

const useDemoUser = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: demoLogin,
    onSuccess: () => {
      navigate({ to: "/dashboard", replace: true })
    },
  })
}

export default useDemoUser

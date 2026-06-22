import { useMutation } from "@tanstack/react-query"
import { login } from "../api/authApi"

const useLogin = () => {
  return useMutation({
    mutationFn: login,
  })
}

export default useLogin

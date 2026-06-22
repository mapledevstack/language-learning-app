import { useMutation } from "@tanstack/react-query"
import { login } from "../api/login"

const useLogin = () => {
  return useMutation({
    mutationFn: login,
  })
}

export default useLogin

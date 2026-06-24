import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "../api/authApi"

const useCurrentUser = () =>
  useQuery({
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
  })

export default useCurrentUser

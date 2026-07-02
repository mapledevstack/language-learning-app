import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "../api/authApi"

const useCurrentUser = () =>
  useQuery({
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
  })

export default useCurrentUser

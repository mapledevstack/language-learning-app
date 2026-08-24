import { useQuery } from "@tanstack/react-query"
import { getActivity } from "../api/statsApi"

export const useUserActivity = () => {
  return useQuery({
    queryKey: ["user-activity"],
    queryFn: getActivity,
  })
}

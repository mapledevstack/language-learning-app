import { useQuery } from "@tanstack/react-query"
import { getDecks } from "../api/decksApi"

const useDecks = () => {
  return useQuery({
    queryKey: ["decks"],
    queryFn: getDecks,
  })
}

export default useDecks

import { useQuery } from "@tanstack/react-query"
import { getDeckStats } from "../api/decksApi"

const useDeckStats = (deckId: string) => {
  return useQuery({
    queryKey: ["deckStats", deckId],
    queryFn: () => getDeckStats(deckId),
  })
}

export default useDeckStats

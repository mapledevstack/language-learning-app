import { useQuery } from "@tanstack/react-query"
import { getResults, getResultsFromMeaning } from "../api/dictionaryApi"

type SearchMode = "word" | "meaning"

const useWordSearch = (
  search: string,
  mode: SearchMode = "word",
  limit: number = 30,
) => {
  return useQuery({
    queryKey: ["search", mode, search, limit],
    queryFn: () =>
      mode === "meaning"
        ? getResultsFromMeaning(search, limit)
        : getResults(search, limit),
    enabled: search.trim().length > 0,
  })
}

export default useWordSearch

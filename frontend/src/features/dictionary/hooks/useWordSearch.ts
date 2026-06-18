import { useQuery } from "@tanstack/react-query"
import { isJapanese } from "wanakana"
import { getResults } from "../api/dictionaryApi"

const useWordSearch = (search: string, limit: number = 30) => {
  return useQuery({
    queryKey: ["search", search],
    queryFn: () => getResults(search, limit),
    enabled: isJapanese(search),
  })
}

export default useWordSearch

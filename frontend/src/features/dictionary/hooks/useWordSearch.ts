import { useQuery } from "@tanstack/react-query"
import { isJapanese } from "wanakana"
import { getResults } from "../api/dictionaryApi"

const useWordSearch = (search: string) => {
  return useQuery({
    queryKey: ["search", search],
    queryFn: () => getResults(search),
    enabled: isJapanese(search),
  })
}

export default useWordSearch

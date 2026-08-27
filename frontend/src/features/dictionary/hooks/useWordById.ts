import { useQuery } from "@tanstack/react-query"
import { getWordById } from "../api/dictionaryApi"

const useWordById = (wordId: string) =>
  useQuery({
    queryKey: ["word", wordId],
    queryFn: () => getWordById(wordId),

    enabled: !!wordId,
  })

export default useWordById

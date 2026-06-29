import { useQuery } from "@tanstack/react-query"
import { getSentences } from "../api/dictionaryApi"

const useSentences = (word: string, limit = 3) => {
  return useQuery({
    queryKey: ["sentences", word, limit],
    queryFn: () => getSentences(word, limit),
    enabled: !!word.trim(),
  })
}

export default useSentences

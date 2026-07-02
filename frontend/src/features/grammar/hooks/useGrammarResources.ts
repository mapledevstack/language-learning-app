import { useSuspenseQuery } from "@tanstack/react-query"
import { getGrammarResources } from "../api/grammarApi"

const useGrammarResources = (search: string) =>
  useSuspenseQuery({
    queryKey: ["grammar", search],
    queryFn: () => getGrammarResources(search),
  })

export default useGrammarResources

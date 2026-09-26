import { getEmbedding, vectorSearch } from "./grammar.utils.js"

export const searchGrammar = async (q: string, limit: number) => {
  const queryEmbedding = await getEmbedding(q)

  return vectorSearch(queryEmbedding, limit)
}

import {
  cosineSimilarity,
  getCachedEmbedding,
  getGrammarResources,
} from "./grammar.utils.js"

export const searchGrammar = async (q: string, limit: number) => {
  const queryEmbedding = await getCachedEmbedding(q)
  const resources = await getGrammarResources()

  return resources
    .map(({ embedding, ...resource }) => ({
      ...resource,
      score: cosineSimilarity(queryEmbedding, embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

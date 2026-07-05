import {
  cosineSimilarity,
  getEmbedding,
  getGrammarResources,
} from "./grammar.utils.js"

export const searchGrammar = async (q: string, limit: number) => {
  const queryEmbedding = await getEmbedding(q)
  const resources = await getGrammarResources()

  return resources
    .map(({ embedding, ...resource }) => ({
      ...resource,
      score: cosineSimilarity(queryEmbedding, embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

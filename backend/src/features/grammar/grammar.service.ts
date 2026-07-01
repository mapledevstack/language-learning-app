import { GrammarResource } from "./grammar.model.js"
import { cosineSimilarity, getEmbedding } from "./grammar.utils.js"

export const searchGrammar = async (q: string, limit: number) => {
  const queryEmbedding = await getEmbedding(q)

  const resources = await GrammarResource.find().lean()

  return resources
    .map(({ embedding, ...resource }) => ({
      ...resource,
      score: cosineSimilarity(queryEmbedding, embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

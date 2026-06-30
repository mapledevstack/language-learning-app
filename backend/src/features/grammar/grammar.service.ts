import { GrammarResource } from "./grammar.model.js"

export const searchGrammar = async (q: string, limit: number) => {
  const regex = new RegExp(q, "i")

  return GrammarResource.find({
    $or: [{ title: regex }, { preview: regex }, { source: regex }],
  })
    .limit(limit)
    .lean()
}

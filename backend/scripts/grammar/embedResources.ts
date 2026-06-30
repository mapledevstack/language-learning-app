import { getEmbedding } from "../../src/features/grammar/grammar.utils.js"

export type GrammarResource = {
  title: string
  section: string
  source: string
  sourceUrl: string
  content: string
}

export type EmbeddedGrammarResource = {
  title: string
  section: string
  source: string
  sourceUrl: string
  content: string
  embedding: number[]
}

const embedResources = async (
  resources: GrammarResource[],
): Promise<EmbeddedGrammarResource[]> => {
  const embeddedResources: EmbeddedGrammarResource[] = []

  for (const resource of resources) {
    const embedding = await getEmbedding(resource.content)
    embeddedResources.push({
      ...resource,
      embedding,
    })
  }

  console.log(`Embedded ${embeddedResources.length} grammar resources.`)

  return embeddedResources
}

export default embedResources

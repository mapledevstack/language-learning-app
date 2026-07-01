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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const embedResources = async (
  resources: GrammarResource[],
): Promise<EmbeddedGrammarResource[]> => {
  const embeddedResources: EmbeddedGrammarResource[] = []

  for (const [index, resource] of resources.entries()) {
    console.log(
      `[${index + 1}/${resources.length}] Embedding "${resource.section}"...`,
    )

    const embedding = await getEmbedding(resource.content)

    embeddedResources.push({
      ...resource,
      embedding,
    })

    await sleep(2000)
  }

  console.log(`Embedded ${embeddedResources.length} grammar resources.`)

  return embeddedResources
}

export default embedResources

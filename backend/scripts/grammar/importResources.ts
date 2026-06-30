import connectDB from "../../src/config/db.js"
import { GrammarResource } from "../../src/features/grammar/grammar.model.js"

export type EmbeddedGrammarResource = {
  title: string
  section: string
  source: string
  sourceUrl: string
  content: string
  embedding: number[]
}

const importResources = async (
  embeddedResources: EmbeddedGrammarResource[],
) => {
  await connectDB()

  for (const resource of embeddedResources) {
    await GrammarResource.create(resource)
  }

  console.log(`Imported ${embeddedResources.length} grammar resources.`)
}

export default importResources

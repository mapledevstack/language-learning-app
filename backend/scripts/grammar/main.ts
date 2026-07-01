import getResources from "./getResources.js"
import embedResources from "./embedResources.js"
import importResources from "./importResources.js"
import getGrammarUrls from "./getURLs.js"

const urls = await getGrammarUrls()
const resources = []

for (const url of urls) {
  const urlResources = await getResources(url)
  resources.push(...urlResources)
}

const embeddedResources = await embedResources(resources)

await importResources(embeddedResources)

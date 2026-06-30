import getResources from "./getResources.js"
import embedResources from "./embedResources.js"
import importResources from "./importResources.js"

const resources = await getResources()

const embeddedResources = await embedResources(resources)

await importResources(embeddedResources)

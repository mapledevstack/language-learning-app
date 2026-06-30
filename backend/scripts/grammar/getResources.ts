import * as cheerio from "cheerio"

export type GrammarResource = {
  title: string
  section: string
  source: string
  sourceUrl: string
  content: string
}

const SOURCE = "Tae Kim's Guide to Japanese Grammar"
const URL = "https://guidetojapanese.org/learn/grammar/verbs"

const getResources = async (): Promise<GrammarResource[]> => {
  const res = await fetch(URL)

  if (!res.ok) {
    throw new Error(`Failed to fetch resources from ${URL}: ${res.status}`)
  }

  const html = await res.text()
  const $ = cheerio.load(html)

  const topic = $("article > header > h1").text()

  const resources: GrammarResource[] = []

  let currentSection = ""
  let currentSectionId: string | undefined
  let currentContent: string[] = []

  const savePrevSection = () => {
    if (!currentSection || currentContent.length === 0) return

    resources.push({
      title: topic,
      section: currentSection,
      source: SOURCE,
      sourceUrl: currentSectionId ? `URL#${currentSectionId}` : URL,
      content: currentContent.join("\n"),
    })
  }

  $("article > .entry-content")
    .children()
    .each((_, el) => {
      const tagName = el.tagName?.toLowerCase()
      const text = $(el).text().replace(/\s+/g, " ").trim()

      if (!text) return

      if (tagName === "h2") {
        savePrevSection()

        currentSection = text
        currentSectionId = $(el).attr("id")
        currentContent = []

        return
      }

      if (currentSection) {
        currentContent.push(text)
      }
    })

  savePrevSection()

  console.log(`Fetched ${resources.length} grammar resources from ${SOURCE}.`)

  return resources
}

export default getResources

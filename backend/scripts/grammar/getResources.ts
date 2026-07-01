import * as cheerio from "cheerio"

export type GrammarResource = {
  title: string
  section: string
  source: string
  sourceUrl: string
  content: string
}

const SOURCE = "Tae Kim's Guide to Japanese Grammar"

const getResources = async (url: string): Promise<GrammarResource[]> => {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Failed to fetch resources from ${url}: ${res.status}`)
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
      sourceUrl: currentSectionId ? `${url}#${currentSectionId}` : url,
      content: currentContent.join("\n"),
    })

    console.log(`Fetched ${currentSection}`)
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

  return resources
}

export default getResources

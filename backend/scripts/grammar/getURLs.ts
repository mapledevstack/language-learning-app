import * as cheerio from "cheerio"

const CATEGORY_URLS = [
  "https://guidetojapanese.org/learn/category/grammar-guide/the-writing-system/",
  "https://guidetojapanese.org/learn/category/grammar-guide/basic-grammar/",
  "https://guidetojapanese.org/learn/category/grammar-guide/essential-grammar/",
  "https://guidetojapanese.org/learn/category/grammar-guide/special-expressions/",
  "https://guidetojapanese.org/learn/category/grammar-guide/advanced-topics/",
]

const getGrammarUrls = async (): Promise<string[]> => {
  const urls = new Set<string>()

  for (const categoryUrl of CATEGORY_URLS) {
    const res = await fetch(categoryUrl)

    if (!res.ok) {
      throw new Error(`Failed to fetch URLs from ${categoryUrl}: ${res.status}`)
    }

    const html = await res.text()
    const $ = cheerio.load(html)

    $("a").each((_, el) => {
      const href = $(el).attr("href")
      if (!href) return

      const url = new URL(href, categoryUrl).toString()

      if (!url.startsWith("https://guidetojapanese.org/learn/grammar/")) return

      urls.add(url)
    })
  }

  const result = [...urls]

  return result
}

export default getGrammarUrls

import { KanjiSchema } from "../schemas/KanjiSchema"
import { z } from "zod"
import { WordsSchema } from "../schemas/WordSchema"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getKanjis = async (kanjisGroup: string[][]) => {
  const flatKanjis = [...new Set(kanjisGroup.flat())]

  if (flatKanjis.length === 0) return []

  const params = new URLSearchParams()

  flatKanjis.forEach((kanji) => {
    params.append("q", kanji)
  })

  const res = await fetch(`${API_BASE_URL}/dictionary/kanjis?${params}`)

  if (!res.ok) {
    throw new Error("failed to fetch kanjis")
  }

  const data = z.array(KanjiSchema).parse(await res.json())

  const kanjiMap = kanjisGroup.map((kanjis) =>
    kanjis.map((kanji) => data.find((d) => d.kanji === kanji)),
  )

  return kanjiMap
}

export const getResults = async (search: string, limit: number) => {
  const res = await fetch(
    `${API_BASE_URL}/dictionary/search?q=${search}&limit=${limit}`,
  )

  if (!res.ok) {
    throw new Error("failed to fetch kanjis")
  }

  const data = await res.json()

  return WordsSchema.parse(data)
}

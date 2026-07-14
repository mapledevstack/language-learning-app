import { z } from "zod"
import api from "@/utils/api"

import { KanjiSchema } from "../schemas/KanjiSchema"
import { WordsSchema } from "../schemas/WordSchema"
import { SentencesSchema, type Sentence } from "../schemas/SentenceSchema"

export const getKanjis = async (kanjisGroup: string[][]) => {
  const flatKanjis = [...new Set(kanjisGroup.flat())]

  if (flatKanjis.length === 0) return []

  const params = new URLSearchParams()

  flatKanjis.forEach((kanji) => {
    params.append("q", kanji)
  })

  const data = KanjiSchema.array().parse(
    await api.get(`/dictionary/kanjis?${params}`),
  )

  return kanjisGroup.map((kanjis) =>
    kanjis.map((kanji) => data.find((d) => d.kanji === kanji)),
  )
}

export const getResults = async (search: string, limit: number) => {
  return WordsSchema.parse(
    await api.get(`/dictionary/search?q=${search}&limit=${limit}`),
  )
}

export const getResultsFromMeaning = async (search: string, limit: number) => {
  return WordsSchema.parse(
    await api.get(`/dictionary/search/meaning?q=${search}&limit=${limit}`),
  )
}

export const getSentences = async (
  word: string,
  limit = 3,
): Promise<Sentence[]> => {
  return SentencesSchema.parse(
    await api.get(
      `/dictionary/sentences?q=${encodeURIComponent(word)}&limit=${limit}`,
    ),
  )
}

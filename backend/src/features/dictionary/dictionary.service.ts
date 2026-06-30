import { isRomaji, toKana } from "wanakana"
import { escapeRegex } from "../../utils/regex.js"
import { Kanji, Word } from "./dictionary.model.js"
import AppError from "../../utils/appError.js"
import { BAD_GATEWAY, NOT_FOUND } from "../../constants/http.js"
import { TATOEBA_API_URL } from "../../constants/env.js"

export const getKanji = async (kanji: string) => {
  const result = await Kanji.findOne({ kanji }).lean()

  if (!result) {
    throw new AppError("Kanji not found", NOT_FOUND)
  }

  return result
}

export const getKanjis = async (kanjis: string[]) => {
  return Kanji.find({ kanji: { $in: kanjis } }).lean()
}

export const getSearchResults = async (q: string, limit: number) => {
  const query = isRomaji(q) ? toKana(q) : q
  const regex = new RegExp(escapeRegex(query), "i")

  const results = await Word.find({
    $or: [{ "forms.text": regex }, { "forms.reading": regex }],
  })
    .lean()
    .limit(Math.max(limit * 5, 50))

  return results
    .sort((a, b) => {
      const aExact = a.forms.some(
        (f) => f.text === query || f.reading === query,
      )
      const bExact = b.forms.some(
        (f) => f.text === query || f.reading === query,
      )

      if (aExact !== bExact) return Number(bExact) - Number(aExact)

      const aStartsWith = a.forms.some(
        (f) => f.text.startsWith(query) || f.reading.startsWith(query),
      )
      const bStartsWith = b.forms.some(
        (f) => f.text.startsWith(query) || f.reading.startsWith(query),
      )

      if (aStartsWith !== bStartsWith) {
        return Number(bStartsWith) - Number(aStartsWith)
      }

      const aCommon = a.forms.some((f) => f.common)
      const bCommon = b.forms.some((f) => f.common)

      return Number(bCommon) - Number(aCommon)
    })
    .slice(0, limit)
}

export const getSearchFromMeaning = async (q: string, limit: number) => {
  const regex = new RegExp(`\\b${escapeRegex(q)}\\b`, "i")

  const results = await Word.find({
    "meanings.definitions": regex,
  })
    .lean()
    .limit(Math.max(limit * 5, 50))

  return results
    .sort((a, b) => {
      const aCommon = a.forms.some((f) => f.common)
      const bCommon = b.forms.some((f) => f.common)

      return Number(bCommon) - Number(aCommon)
    })
    .slice(0, limit)
}

type TatoebaSentence = {
  text: string
  translations?: {
    text: string
    lang: string
  }[][]
}

export const getSentences = async (q: string, limit = 3) => {
  const url = new URL(TATOEBA_API_URL)

  url.searchParams.set("from", "jpn")
  url.searchParams.set("to", "eng")
  url.searchParams.set("query", q)
  url.searchParams.set("orphans", "no")
  url.searchParams.set("unapproved", "no")

  const res = await fetch(url)

  if (!res.ok) {
    throw new AppError("Could not fetch example sentences", BAD_GATEWAY)
  }

  const data = await res.json()

  return data.results.slice(0, limit).map((sentence: TatoebaSentence) => ({
    japanese: sentence.text,
    english:
      sentence.translations
        ?.flat()
        .find((translation) => translation.lang === "eng")?.text ?? null,
  }))
}

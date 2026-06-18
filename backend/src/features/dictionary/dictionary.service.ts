import { Kanji, Word } from "./dictionary.model.js"

export const getKanji = async (kanji: string) => {
  const result = await Kanji.findOne({ kanji }).lean()

  if (!result) {
    throw new Error("kanji not found")
  }

  return result
}

export const getKanjis = async (kanjis: string[]) => {
  const result = await Kanji.find({ kanji: { $in: kanjis } }).lean()

  return result
}

export const getSearchResults = async (query: string, limit: number) => {
  const results = await Word.find({
    $or: [
      { "forms.text": { $regex: query } },
      { "forms.reading": { $regex: query } },
    ],
  })
    .lean()
    .limit(150)

  results.sort((a, b) => {
    const aExact = a.forms.some((f) => f.text === query)
    const bExact = b.forms.some((f) => f.text === query)

    if (aExact !== bExact) return Number(bExact) - Number(aExact)

    const aCommon = a.forms.some((f) => f.common)
    const bCommon = b.forms.some((f) => f.common)

    return Number(bCommon) - Number(aCommon)
  })

  return results.slice(0, limit)
}

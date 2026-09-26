import { isRomaji, toKana } from "wanakana"
import { Kanji, Word } from "./dictionary.model.js"
import AppError from "../../utils/appError.js"
import { BAD_GATEWAY, NOT_FOUND } from "../../constants/http.js"
import { TATOEBA_API_URL } from "../../constants/env.js"

export const getWordById = async (wordId: string) => {
  const word = await Word.findOne({ wordId }).lean()

  if (!word) {
    throw new AppError("Word not found", NOT_FOUND)
  }

  return word
}

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

  return Word.aggregate([
    {
      $search: {
        index: "dictionary_search",
        compound: {
          should: [
            {
              autocomplete: {
                query,
                path: "forms.text",
              },
            },
            {
              autocomplete: {
                query,
                path: "forms.reading",
              },
            },
            {
              text: {
                query,
                path: "forms.text",
                score: {
                  boost: {
                    value: 10,
                  },
                },
              },
            },
            {
              text: {
                query,
                path: "forms.reading",
                score: {
                  boost: {
                    value: 10,
                  },
                },
              },
            },
            {
              equals: {
                path: "forms.common",
                value: true,
                score: {
                  boost: {
                    value: 5,
                  },
                },
              },
            },
          ],
          minimumShouldMatch: 1,
        },
      },
    },
    {
      $limit: limit,
    },
  ])
}

export const getSearchFromMeaning = async (q: string, limit: number) => {
  return Word.aggregate([
    {
      $search: {
        index: "dictionary_search",
        compound: {
          must: [
            {
              text: {
                query: q,
                path: "meanings.definitions",
              },
            },
          ],
          should: [
            {
              text: {
                query: q,
                path: "meanings.definitions",
                score: {
                  boost: {
                    value: 10,
                  },
                },
              },
            },
            {
              equals: {
                path: "forms.common",
                value: true,
                score: {
                  boost: {
                    value: 5,
                  },
                },
              },
            },
          ],
        },
      },
    },
    {
      $limit: limit,
    },
  ])
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

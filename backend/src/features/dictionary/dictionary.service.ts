import { DictionaryWord } from "./dictionary.model.js"

export const getAllWords = async () => {
  const words = await DictionaryWord.find().limit(200)

  return words
}

export const searchWords = async (query: string) => {
  query = query.trim()

  if (!query) {
    return []
  }

  const results = await DictionaryWord.find({
    $or: [
      {
        "kanji.text": {
          $regex: `^${query}`,
        },
      },
      {
        "kana.text": {
          $regex: `^${query}`,
        },
      },
    ],
  }).limit(100)

  return results
}

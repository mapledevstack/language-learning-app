import { DictionaryWord } from "./dictionary.model.js"

export const getAllWords = async() => {
  return DictionaryWord.find().limit(10)
}

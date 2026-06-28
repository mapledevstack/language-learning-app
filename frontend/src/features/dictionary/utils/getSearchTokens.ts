import { isRomaji, toKana, tokenize } from "wanakana"

const getSearchTokens = (value: string): string[] => {
  const kanaTokens = tokenize(value).map((token) => {
    if (typeof token === "string") {
      return isRomaji(token) ? toKana(token) : token
    } else {
      return ""
    }
  })

  return kanaTokens.filter((kana) => kana.trim())
}

export default getSearchTokens

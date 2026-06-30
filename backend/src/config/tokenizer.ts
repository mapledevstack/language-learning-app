import kuromoji, { type IpadicFeatures, type Tokenizer } from "kuromoji"

let tokenizer: Tokenizer<IpadicFeatures> | null = null

export const getTokenizer = async () => {
  if (tokenizer) return tokenizer

  tokenizer = await new Promise<Tokenizer<IpadicFeatures>>(
    (resolve, reject) => {
      kuromoji
        .builder({ dicPath: "node_modules/kuromoji/dict" })
        .build((err, tokenizer) => {
          if (err) reject(err)
          else resolve(tokenizer)
        })
    },
  )

  return tokenizer
}

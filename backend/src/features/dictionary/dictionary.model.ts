import { Schema, model } from "mongoose"

const DictionaryWordSchema = new Schema(
  {},
  {
    strict: false,
    versionKey: false,
    collection: "words"
  }
)

export const DictionaryWord = model("DictionaryWord", DictionaryWordSchema)

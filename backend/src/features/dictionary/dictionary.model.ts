import mongoose from "mongoose"

const DictionaryWordSchema = new mongoose.Schema(
  {},
  {
    strict: false,
    versionKey: false,
    collection: "words",
  },
)

export const DictionaryWord = mongoose.model(
  "DictionaryWord",
  DictionaryWordSchema,
)

import fs from "node:fs"
import { connectDB } from "../../src/config/db.js"
import { Word } from "../../src/features/dictionary/dictionary.model.js"
import mongoose from "mongoose"

export const importDictionary = async (
  PATH: string,
  MONGO_URI: string | undefined,
) => {
  const words = JSON.parse(
    fs.readFileSync(`${PATH}/processed/words.json`, "utf8"),
  )

  await connectDB(MONGO_URI)

  await Word.deleteMany({})
  console.log("Deleted old words")

  const BATCH_SIZE = 1000
  for (let i = 0; i < words.length; i += BATCH_SIZE) {
    const batch = words.slice(i, i + BATCH_SIZE)
    await Word.insertMany(batch)

    console.log(
      `Imported words: ${Math.min(i + BATCH_SIZE, words.length)}/${words.length}`,
    )
  }

  await mongoose.disconnect()
  console.log("Finished importing words to DB")
}

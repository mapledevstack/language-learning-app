import fs from "node:fs"
import { connectDB } from "../../src/config/db.js"
import mongoose from "mongoose"
import { Kanji } from "../../src/features/dictionary/dictionary.model.js"

export const importKanji = async (
  PATH: string,
  MONGO_URI: string | undefined,
) => {
  const kanji = JSON.parse(
    fs.readFileSync(`${PATH}/processed/kanji.json`, "utf8"),
  )

  await connectDB(MONGO_URI)

  await Kanji.deleteMany({})
  console.log("Deleted old words")

  const BATCH_SIZE = 1000
  for (let i = 0; i < kanji.length; i += BATCH_SIZE) {
    const batch = kanji.slice(i, i + BATCH_SIZE)
    await Kanji.insertMany(batch)

    console.log(
      `Imported kanji: ${Math.min(i + BATCH_SIZE, kanji.length)}/${kanji.length}`,
    )
  }

  await mongoose.disconnect()
  console.log("Finished importing kanji to DB")
}

import mongoose from "mongoose"
import fs from "node:fs"

const importDictionary = async (
  MONGO_URI: string | undefined,
  PATH: string,
) => {
  const FILE_PATH = `${PATH}/processed/words.json`
  const BATCH_SIZE = 1000
  const words = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"))

  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined")
  }

  try {
    await mongoose.connect(MONGO_URI)
    console.log("MongoDB connected!")

    const db = mongoose.connection.db
    if (!db) {
      throw new Error("MongoDB is not available")
    }

    const collection = db.collection("words")

    await collection.deleteMany({})
    console.log("Deleted Old Words")

    for (let i = 0; i < words.length; i += BATCH_SIZE) {
      const batch = words.slice(i, i + BATCH_SIZE)

      await collection.insertMany(batch)
      console.log(
        `Inserted ${((100 * Math.min(i + BATCH_SIZE, words.length)) / words.length).toFixed(2)} %...`,
      )
    }

    console.log("Latest Dictionary imported to MongoDB!")
  } catch (error) {
    console.error(error)
  } finally {
    await mongoose.connection.close()
    console.log("MongoDB connection closed")
  }
}

export default importDictionary

import mongoose from "mongoose"
import "dotenv/config"
import fs from "node:fs"

const FILE_PATH = "data/processed/dictionary-words.json"

const words = JSON.parse(fs.readFileSync(FILE_PATH, "utf8")).slice(300, 303)
// console.log(words)

const MONGO_URI = process.env.MONGO_URI

if(!MONGO_URI) {
  throw new Error("MONGO_URI not defined")
}

try {
  await mongoose.connect(MONGO_URI)
  console.log("MongoDB connected")

  const db = mongoose.connection.db
  await db?.collection("words").insertMany(words)

  console.log("Inserted Words")
} catch(error) {
  console.error(error)
} finally {
  await mongoose.connection.close()
}

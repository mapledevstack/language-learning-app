import mongoose, { Collection } from "mongoose"
import "dotenv/config"
import fs from "node:fs"

const FILE_PATH = "data/processed/dictionary-words.json"
const BATCH_SIZE = 1000
const words = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"))

const MONGO_URI = process.env.MONGO_URI

if(!MONGO_URI) {
  throw new Error("MONGO_URI is not defined")
}

try {
  await mongoose.connect(MONGO_URI)
  console.log("MongoDB connected!")

  const db = mongoose.connection.db

  const collection = db?.collection("words")

  for(let i=0; i<words.length; i+=BATCH_SIZE) {
    const batch = words.slice(i, i+BATCH_SIZE)

    await collection?.insertMany(batch)
    console.log(`Inserted ${100*Math.min(i+BATCH_SIZE, words.length)/words.length}%...`)
  }

  console.log("Dictionary imported to MongoDB!")
} catch(error) {
  console.error(error)
} finally {
  await mongoose.connection.close()
  console.log("MongoDB connection closed")
}

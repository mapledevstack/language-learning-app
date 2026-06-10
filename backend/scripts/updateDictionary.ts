import convertDictionary from "./dictionary/convertDictionary.js"
import downloadDictionary from "./dictionary/downloadDictionary.js"
import importDictionary from "./dictionary/importDictionary.js"
import "dotenv/config"

const JMDict_Extended_API_URL =
  "https://api.github.com/repos/Bluskyo/JMDict_Extended/releases/latest"

const DATA_PATH = "data"

const MONGO_URI = process.env.MONGO_URI

await downloadDictionary(JMDict_Extended_API_URL, DATA_PATH)
await convertDictionary(DATA_PATH)
await importDictionary(MONGO_URI, DATA_PATH)

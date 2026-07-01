import "dotenv/config"
import { downloadWords as downloadWords } from "./downloadWords.js"
import { transformWords as transformWords } from "./transformWords.js"
import { importWords as importWords } from "./importWords.js"

const MONGO_URI = process.env.MONGO_URI
const DATA_PATH = "data"
const JMDict_Extended_API_URL =
  "https://api.github.com/repos/Bluskyo/JMDict_Extended/releases/latest"

// Words
await downloadWords(JMDict_Extended_API_URL, DATA_PATH)
await transformWords(DATA_PATH)
await importWords(DATA_PATH, MONGO_URI)

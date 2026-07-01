import { importKanji } from "./importKanji.js"
import { transformKanji } from "./transformKanji.js"
import "dotenv/config"

const DATA_PATH = "data"
const MONGO_URI = process.env.MONGO_URI

await transformKanji(DATA_PATH)
await importKanji(DATA_PATH, MONGO_URI)

import fs from "node:fs"

const FILE_PATH = "data/raw/term_bank_1.json"

const file = fs.readFileSync(FILE_PATH, "utf-8")
const data = JSON.parse(file)

console.log(`length: ${data.length}`)

const firstEl = data[105][5][0].content[1].content
console.log(firstEl)

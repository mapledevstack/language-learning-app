import "dotenv/config"
import fs from "node:fs"
import mongoose from "mongoose"

const JMDict_Extended_API_URL =
  "https://api.github.com/repos/Bluskyo/JMDict_Extended/releases/latest"
const DATA_PATH = "data"
const MONGO_URI = process.env.MONGO_URI

const downloadDictionary = async (
  JMDict_Extended_API_URL: string,
  PATH: string,
) => {
  const releaseResponse = await fetch(JMDict_Extended_API_URL)
  const release = await releaseResponse.json()

  const latestAsset = release.assets[0]

  const prevAssetName = fs.readdirSync(`${PATH}/raw`)[0]
  if (prevAssetName === latestAsset.name) {
    console.log("Already up-to-date:", prevAssetName)
    process.exit(0)
  }

  const res = await fetch(latestAsset.browser_download_url)
  const data = await res.text()

  fs.writeFileSync(`${PATH}/raw/${latestAsset.name}`, data)
  fs.unlinkSync(`${PATH}/raw/${prevAssetName}`)

  console.log(`Updated from ${prevAssetName} to ${latestAsset.name}`)
}

const convertDictionary = async (PATH: string) => {
  const file = fs.readdirSync(`${PATH}/raw`)[0]

  if (!file) {
    console.log("data doesn't exist")
    process.exit(0)
  }

  const data = JSON.parse(
    fs.readFileSync(`${PATH}/raw/${file}`, "utf8").trim(),
  ) as {
    words: Record<string, unknown>[]
    [key: string]: unknown
  }

  const { words, ...meta } = data

  fs.writeFileSync(`${PATH}/processed/meta.json`, JSON.stringify(meta))
  fs.writeFileSync(`${PATH}/processed/words.json`, JSON.stringify(words))

  console.log("words and meta data json created!")
}

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

await downloadDictionary(JMDict_Extended_API_URL, DATA_PATH)
await convertDictionary(DATA_PATH)
await importDictionary(MONGO_URI, DATA_PATH)

/*
const keys = [
  'version',
  'languages',
  'commonOnly',
  'dictDate',
  'dictRevisions',
  'tags',
  'words'
]
*/

/*
const example = {
  "id": "1006080",
  "kanji": [
    {
      "common": false,
      "text": "すすり泣く",
      "tags": [],
      "furigana": [
        {
          "ruby": "すすり"
        },
        {
          "ruby": "泣",
          "rt": "な"
        },
        {
          "ruby": "く"
        }
      ],
      "jlptLevel": null,
      "pitchAccent": {
        "hatsuon": "[Dev]すすり･な~く",
        "accPatts": "4",
        "zoPatts": "LHHHLL"
      }
    },
    {
      "common": false,
      "text": "啜り泣く",
      "tags": [],
      "furigana": [
        {
          "ruby": "啜",
          "rt": "すす"
        },
        {
          "ruby": "り"
        },
        {
          "ruby": "泣",
          "rt": "な"
        },
        {
          "ruby": "く"
        }
      ],
      "jlptLevel": null,
      "pitchAccent": {
        "hatsuon": "[Dev]すすり･な~く",
        "accPatts": "4",
        "zoPatts": "LHHHLL"
      }
    },
    {
      "common": false,
      "text": "啜りなく",
      "tags": [
        "sK"
      ],
      "furigana": [
        {
          "ruby": "啜",
          "rt": "すす"
        },
        {
          "ruby": "りなく"
        }
      ],
      "jlptLevel": null,
      "pitchAccent": []
    }
  ],
  "kana": [
    {
      "common": false,
      "text": "すすりなく",
      "tags": [],
      "appliesToKanji": [
        "*"
      ],
      "jlptLevel": null,
      "pitchAccent": []
    }
  ],
  "sense": [
    {
      "partOfSpeech": [
        "v5k",
        "vi"
      ],
      "appliesToKanji": [
        "*"
      ],
      "appliesToKana": [
        "*"
      ],
      "related": [],
      "antonym": [],
      "field": [],
      "dialect": [],
      "misc": [],
      "info": [],
      "languageSource": [],
      "gloss": [
        {
          "lang": "eng",
          "gender": null,
          "type": null,
          "text": "to sob"
        }
      ]
    }
  ]
}
*/

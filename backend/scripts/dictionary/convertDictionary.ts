import fs from "node:fs"

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

export default convertDictionary

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

import fs from "node:fs"

const FILE_PATH = "data/raw/jmdictExtended-2026-06-02.json"

const file = fs.readFileSync(FILE_PATH, "utf-8")
const data = JSON.parse(file.trim()) as {words: Record<string, unknown>[]} 
const words = data.words.map(word => {
  const {id, ...remaining} = word
  return remaining
})

fs.writeFileSync(
  "data/processed/dictionary-words.json", 
  JSON.stringify(words)
)

console.log("Words json created!")

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


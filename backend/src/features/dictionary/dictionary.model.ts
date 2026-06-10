import { Schema, model } from "mongoose"

const DictionaryWordSchema = new Schema(
  {},
  {
    strict: false,
    versionKey: false,
    collection: "words",
  },
)

export const DictionaryWord = model("DictionaryWord", DictionaryWordSchema)

const schema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["_id", "id", "kana", "kanji", "sense"],
    properties: {
      _id: {
        bsonType: "objectId",
      },
      id: {
        bsonType: "string",
      },
      kana: {
        bsonType: "array",
        items: {
          bsonType: "object",
          properties: {
            appliesToKanji: {
              bsonType: "array",
              items: {
                bsonType: "string",
              },
            },
            common: {
              bsonType: "bool",
            },
            jlptLevel: {
              bsonType: ["null", "int"],
            },
            pitchAccent: {
              anyOf: [
                {
                  bsonType: "array",
                },
                {
                  bsonType: "object",
                  properties: {
                    accPatts: {
                      bsonType: "string",
                    },
                    hatsuon: {
                      bsonType: "string",
                    },
                    zoPatts: {
                      bsonType: "string",
                    },
                  },
                  required: ["accPatts", "hatsuon", "zoPatts"],
                },
              ],
            },
            tags: {
              bsonType: "array",
              items: {
                bsonType: "string",
              },
            },
            text: {
              bsonType: "string",
            },
          },
          required: [
            "appliesToKanji",
            "common",
            "jlptLevel",
            "pitchAccent",
            "tags",
            "text",
          ],
        },
      },
      kanji: {
        bsonType: "array",
        items: {
          bsonType: "object",
          properties: {
            common: {
              bsonType: "bool",
            },
            furigana: {
              bsonType: "array",
              items: {
                bsonType: "object",
                properties: {
                  rt: {
                    bsonType: "string",
                  },
                  ruby: {
                    bsonType: "string",
                  },
                },
                required: ["ruby"],
              },
            },
            jlptLevel: {
              bsonType: ["null", "int"],
            },
            pitchAccent: {
              anyOf: [
                {
                  bsonType: "object",
                  properties: {
                    accPatts: {
                      bsonType: "string",
                    },
                    hatsuon: {
                      bsonType: "string",
                    },
                    zoPatts: {
                      bsonType: "string",
                    },
                  },
                  required: ["accPatts", "hatsuon", "zoPatts"],
                },
                {
                  bsonType: "array",
                },
              ],
            },
            tags: {
              bsonType: "array",
              items: {
                bsonType: "string",
              },
            },
            text: {
              bsonType: "string",
            },
          },
          required: [
            "common",
            "furigana",
            "jlptLevel",
            "pitchAccent",
            "tags",
            "text",
          ],
        },
      },
      sense: {
        bsonType: "array",
        items: {
          bsonType: "object",
          properties: {
            antonym: {
              bsonType: "array",
              items: {
                bsonType: "array",
                items: {
                  bsonType: ["string", "int"],
                },
              },
            },
            appliesToKana: {
              bsonType: "array",
              items: {
                bsonType: "string",
              },
            },
            appliesToKanji: {
              bsonType: "array",
              items: {
                bsonType: "string",
              },
            },
            dialect: {
              bsonType: "array",
              items: {
                bsonType: "string",
              },
            },
            field: {
              bsonType: "array",
              items: {
                bsonType: "string",
              },
            },
            gloss: {
              bsonType: "array",
              items: {
                bsonType: "object",
                properties: {
                  gender: {
                    bsonType: "null",
                  },
                  lang: {
                    bsonType: "string",
                  },
                  text: {
                    bsonType: "string",
                  },
                  type: {
                    bsonType: ["null", "string"],
                  },
                },
                required: ["gender", "lang", "text", "type"],
              },
            },
            info: {
              bsonType: "array",
              items: {
                bsonType: "string",
              },
            },
            languageSource: {
              bsonType: "array",
              items: {
                bsonType: "object",
                properties: {
                  full: {
                    bsonType: "bool",
                  },
                  lang: {
                    bsonType: "string",
                  },
                  text: {
                    bsonType: ["string", "null"],
                  },
                  wasei: {
                    bsonType: "bool",
                  },
                },
                required: ["full", "lang", "text", "wasei"],
              },
            },
            misc: {
              bsonType: "array",
              items: {
                bsonType: "string",
              },
            },
            partOfSpeech: {
              bsonType: "array",
              items: {
                bsonType: "string",
              },
            },
            related: {
              bsonType: "array",
              items: {
                bsonType: "array",
                items: {
                  bsonType: ["string", "int"],
                },
              },
            },
          },
          required: [
            "antonym",
            "appliesToKana",
            "appliesToKanji",
            "dialect",
            "field",
            "gloss",
            "info",
            "languageSource",
            "misc",
            "partOfSpeech",
            "related",
          ],
        },
      },
    },
  },
}

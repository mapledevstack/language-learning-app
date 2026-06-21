import { Schema, model } from "mongoose"

const wordSchema = new Schema(
  {
    wordId: {
      type: String,
      required: true,
      unique: true,
    },

    forms: [
      {
        _id: false,

        text: {
          type: String,
          required: true,
          index: true,
        },

        reading: {
          type: String,
          required: true,
          index: true,
        },

        furigana: [
          {
            _id: false,

            text: {
              type: String,
              required: true,
            },

            reading: {
              type: String,
              default: null,
            },
          },
        ],

        common: {
          type: Boolean,
          default: false,
        },

        tags: {
          type: [String],
          default: [],
        },

        pitchAccent: {
          type: String,
          default: null,
        },
      },
    ],

    meanings: [
      {
        _id: false,

        definitions: {
          type: [String],
          required: true,
        },

        partsOfSpeech: {
          type: [String],
          default: [],
        },

        tags: {
          type: [String],
          default: [],
        },

        notes: {
          type: [String],
          default: [],
        },
      },
    ],
  },
  { versionKey: false },
)

const kanjiSchema = new Schema({
  kanji: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  meanings: {
    type: [String],
    required: true,
    default: [],
  },

  onReadings: {
    type: [String],
    required: true,
    default: [],
  },

  kunReadings: {
    type: [String],
    required: true,
    default: [],
  },

  strokeCount: {
    type: Number,
  },

  grade: {
    type: Number,
    default: null,
  },

  jlpt: {
    type: String,
    default: null,
  },

  frequency: {
    type: Number,
    default: null,
  },

  notes: {
    type: [String],
    default: [],
  },
})

export const Word = model("Word", wordSchema)
export const Kanji = model("Kanji", kanjiSchema)

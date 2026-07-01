import mongoose, { Schema } from "mongoose"

const grammarResourceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    section: {
      type: String,
      required: true,
      trim: true,
    },

    source: {
      type: String,
      required: true,
      trim: true,
    },

    sourceUrl: {
      type: String,
      required: true,
      trim: true,
    },

    embedding: {
      type: [Number],
      required: true,
    },
  },
  { versionKey: false },
)

export const GrammarResource = mongoose.model(
  "GrammarResource",
  grammarResourceSchema,
  "grammar_resources",
)

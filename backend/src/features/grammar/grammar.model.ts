import mongoose, { Schema } from "mongoose"

const grammarResourceSchema = new Schema(
  {
    title: {
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

    preview: {
      type: String,
      required: true,
      trim: true,
    },

    embedding: {
      type: [Number],
      required: true,
      select: false,
    },
  },
  { timestamps: true },
)

export const GrammarResource = mongoose.model(
  "GrammarResource",
  grammarResourceSchema,
)

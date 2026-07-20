import { Schema, model, Types } from "mongoose"

const fsrsSchema = new Schema(
  {
    due: {
      type: Date,
      required: true,
    },

    stability: {
      type: Number,
      required: true,
    },

    difficulty: {
      type: Number,
      required: true,
    },

    scheduled_days: {
      type: Number,
      required: true,
    },

    learning_steps: {
      type: Number,
      required: true,
    },

    reps: {
      type: Number,
      required: true,
    },

    lapses: {
      type: Number,
      required: true,
    },

    state: {
      type: Number,
      required: true,
    },

    last_review: {
      type: Date,
      default: null,
    },

    elapsed_days: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  },
)

const flashCardSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    wordId: {
      type: String,
      required: true,
      index: true,
    },

    deckId: {
      type: Types.ObjectId,
      ref: "Deck",
      required: true,
    },

    front: {
      text: {
        type: String,
        required: true,
        trim: true,
      },

      media: {
        image: String,
        audio: String,
        video: String,
      },
    },

    source: {
      type: String,
      default: "dictionary",
      trim: true,
    },

    userNotes: {
      type: String,
      default: "",
      trim: true,
    },

    fsrs: {
      type: fsrsSchema,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const FlashCard = model("FlashCard", flashCardSchema)

export default FlashCard

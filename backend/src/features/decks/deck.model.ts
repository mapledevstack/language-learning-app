import { Schema, model, Types } from "mongoose"

const deckSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    flashCardIds: [
      {
        type: Types.ObjectId,
        ref: "FlashCard",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const Deck = model("Deck", deckSchema)

export default Deck

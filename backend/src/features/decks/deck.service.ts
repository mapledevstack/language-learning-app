import { Types } from "mongoose"
import Deck from "./deck.model.js"
import { CreateDeckSchema } from "./deck.schemas.js"

export const getDecks = async (userId: Types.ObjectId) => {
  return Deck.find({ userId })
}

export const createDeck = async (
  userId: Types.ObjectId,
  data: CreateDeckSchema,
) => {
  console.log("Creating deck...")

  const deck = await Deck.create({
    userId,
    title: data.title,
    description: data.description,
    flashCardIds: [],
  })
  console.log("Created deck...")

  return deck
}

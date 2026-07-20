import { Types } from "mongoose"
import Deck from "./deck.model.js"
import { CreateDeckSchema, UpdateDeckSchema } from "./deck.schemas.js"
import AppError from "../../utils/appError.js"
import { NOT_FOUND } from "../../constants/http.js"

export const getDecks = async (userId: Types.ObjectId) => {
  return Deck.find({ userId }).select("_id title description")
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
  })
  console.log("Created deck...")

  return deck
}

export const getDeck = async (userId: Types.ObjectId, deckId: string) => {
  const deck = await Deck.findOne({
    _id: deckId,
    userId,
  })

  if (!deck) {
    throw new AppError("Deck not found", NOT_FOUND)
  }

  return deck
}

export const updateDeck = async (
  userId: Types.ObjectId,
  deckId: string,
  data: UpdateDeckSchema,
) => {
  const deck = await Deck.findOneAndUpdate(
    {
      _id: deckId,
      userId,
    },
    data,
    {
      new: true,
      runValidators: true,
    },
  )

  if (!deck) {
    throw new AppError("Deck not found", NOT_FOUND)
  }

  return deck
}

export const deleteDeck = async (userId: Types.ObjectId, deckId: string) => {
  const deck = await Deck.findOneAndDelete({
    _id: deckId,
    userId,
  })

  if (!deck) {
    throw new AppError("Deck not found", NOT_FOUND)
  }
}

import { Types } from "mongoose"
import Deck from "./deck.model.js"
import { CreateDeckSchema, UpdateDeckSchema } from "./deck.schemas.js"
import AppError from "../../utils/appError.js"
import { NOT_FOUND } from "../../constants/http.js"
import FlashCard from "../flashcards/flashcard.model.js"
import { State } from "ts-fsrs"

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

export const getDeckStats = async (userId: Types.ObjectId, deckId: string) => {
  await getDeck(userId, deckId)

  const filter = {
    deckId,
    userId,
  }

  const [
    totalCards,
    newCards,
    learningCards,
    reviewCards,
    relearningCards,
    dueCards,
  ] = await Promise.all([
    FlashCard.countDocuments(filter),
    FlashCard.countDocuments({
      ...filter,
      "fsrs.state": State.New,
    }),
    FlashCard.countDocuments({
      ...filter,
      "fsrs.state": State.Learning,
    }),
    FlashCard.countDocuments({
      ...filter,
      "fsrs.state": State.Review,
    }),
    FlashCard.countDocuments({
      ...filter,
      "fsrs.state": State.Relearning,
    }),
    FlashCard.countDocuments({
      ...filter,
      "fsrs.due": { $lte: new Date() },
    }),
  ])

  return {
    totalCards,
    newCards,
    learningCards,
    reviewCards,
    relearningCards,
    dueCards,
  }
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

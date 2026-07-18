import { Types } from "mongoose"
import { createEmptyCard, Rating, RatingType } from "ts-fsrs"
import FlashCard from "./flashcard.model.js"
import {
  CreateFlashCardSchema,
  UpdateFlashCardSchema,
} from "./flashcard.schema.js"
import AppError from "../../utils/appError.js"
import { NOT_FOUND } from "../../constants/http.js"
import { scheduler } from "./flashcard.fsrs.js"

export const createFlashCard = async (
  userId: Types.ObjectId,
  data: CreateFlashCardSchema,
) => {
  const fsrs = createEmptyCard()

  return FlashCard.create({
    userId,

    wordId: data.wordId,

    deckId: data.deckId,

    front: {
      text: data.front.text,

      media: {
        image: data.front.media?.image ?? null,
        audio: data.front.media?.audio ?? null,
      },
    },

    source: data.source ?? "dictionary",

    userNotes: data.userNotes ?? "",

    fsrs,
  })
}

export const getFlashCards = async (userId: Types.ObjectId, deckId: string) => {
  return FlashCard.find({
    userId,
    deckId,
  }).sort({
    createdAt: -1,
  })
}

export const getDueFlashCards = async (
  userId: Types.ObjectId,
  deckId: string,
) => {
  return FlashCard.find({
    userId,
    deckId,
    "fsrs.due": {
      $lte: new Date(),
    },
  }).sort({ "fsrs.due": 1 })
}

export const deleteFlashCard = async (
  userId: Types.ObjectId,
  flashcardId: string,
) => {
  await FlashCard.findOneAndDelete({
    _id: flashcardId,
    userId,
  })
}

export const updateFlashCard = async (
  userId: Types.ObjectId,
  flashCardId: string,
  data: UpdateFlashCardSchema,
) => {
  return FlashCard.findOneAndUpdate(
    {
      _id: flashCardId,
      userId,
    },
    data,
    {
      returnDocument: "after",
      runValidators: true,
    },
  )
}

export const reviewFlashCard = async (
  userId: Types.ObjectId,
  flashCardId: string,
  rating: RatingType,
) => {
  const flashCard = await FlashCard.findOne({
    _id: flashCardId,
    userId,
  })

  if (!flashCard) {
    throw new AppError("Card not found", NOT_FOUND)
  }

  const grade = rating === "Again" ? Rating.Again : Rating.Good

  // ts-fsrs expects a plain Card object.
  // Passing the Mongoose nested document directly causes scheduler.next()
  // to produce NaN values for the first review.

  const card = {
    due: flashCard.fsrs.due,
    stability: flashCard.fsrs.stability,
    difficulty: flashCard.fsrs.difficulty,
    elapsed_days: flashCard.fsrs.elapsed_days,
    scheduled_days: flashCard.fsrs.scheduled_days,
    reps: flashCard.fsrs.reps,
    lapses: flashCard.fsrs.lapses,
    learning_steps: flashCard.fsrs.learning_steps,
    state: flashCard.fsrs.state,
    ...(flashCard.fsrs.last_review && {
      last_review: flashCard.fsrs.last_review,
    }),
  }

  const result = scheduler.next(card, new Date(), grade)

  flashCard.fsrs = result.card

  await flashCard.save()

  return flashCard
}

import { Types } from "mongoose"
import { createEmptyCard } from "ts-fsrs"
import FlashCard from "./flashcard.model.js"
import {
  CreateFlashCardSchema,
  UpdateFlashCardSchema,
} from "./flashcard.schema.js"

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
      new: true,
      runValidators: true,
    },
  )
}

import { Types } from "mongoose"
import { createEmptyCard } from "ts-fsrs"
import FlashCard from "./flashcard.model.js"
import { CreateFlashCardSchema } from "./flashcard.schema.js"

export const createFlashCard = async (
  userId: Types.ObjectId,
  data: CreateFlashCardSchema,
) => {
  const fsrs = createEmptyCard()

  const flashCard = await FlashCard.create({
    userId,

    wordId: data.wordId,

    deckIds: [data.deckId],

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

  return flashCard
}

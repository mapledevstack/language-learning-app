import catchErrors from "../../utils/catchErrors.js"
import { CREATED, NO_CONTENT, OK } from "../../constants/http.js"
import {
  createFlashCard,
  deleteFlashCard,
  getFlashCards,
  updateFlashCard,
} from "./flashcard.service.js"
import { getAuthUserId } from "../auth/auth.utils.js"
import {
  createFlashCardSchema,
  deleteFlashCardParamsSchema,
  getFlashCardsParamsSchema,
  updateFlashCardParamsSchema,
  updateFlashCardSchema,
} from "./flashcard.schema.js"

export const createFlashCardController = catchErrors(async (req, res) => {
  const body = createFlashCardSchema.parse(req.body)
  const userId = getAuthUserId(req)

  const flashCard = await createFlashCard(userId, body)

  res.status(CREATED).json(flashCard)
})

export const getFlashCardsController = catchErrors(async (req, res) => {
  const { deckId } = getFlashCardsParamsSchema.parse(req.params)
  const userId = getAuthUserId(req)

  const flashCards = await getFlashCards(userId, deckId)

  res.status(OK).json(flashCards)
})

export const deleteFlashCardController = catchErrors(async (req, res) => {
  const { flashcardId } = deleteFlashCardParamsSchema.parse(req.params)
  const userId = getAuthUserId(req)

  await deleteFlashCard(userId, flashcardId)

  res.sendStatus(NO_CONTENT)
})

export const updateFlashCardController = catchErrors(async (req, res) => {
  const { flashcardId } = updateFlashCardParamsSchema.parse(req.params)
  const body = updateFlashCardSchema.parse(req.body)
  const userId = getAuthUserId(req)

  const flashCard = await updateFlashCard(userId, flashcardId, body)

  res.status(OK).json(flashCard)
})

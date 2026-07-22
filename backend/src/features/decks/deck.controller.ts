import catchErrors from "../../utils/catchErrors.js"
import { CREATED, NO_CONTENT, OK } from "../../constants/http.js"
import {
  createDeckSchema,
  deckParamsSchema,
  updateDeckSchema,
} from "./deck.schemas.js"
import {
  createDeck,
  deleteDeck,
  getDeck,
  getDecks,
  getDeckStats,
  updateDeck,
} from "./deck.service.js"
import { getAuthUserId } from "../auth/auth.utils.js"

export const getDecksController = catchErrors(async (req, res) => {
  const userId = getAuthUserId(req)

  const decks = await getDecks(userId)

  res.status(OK).json(
    decks.map((deck) => ({
      id: deck._id.toString(),
      title: deck.title,
      description: deck.description,
    })),
  )
})

export const createDeckController = catchErrors(async (req, res) => {
  const body = createDeckSchema.parse(req.body)
  const userId = getAuthUserId(req)

  const deck = await createDeck(userId, body)

  res.status(CREATED).json(deck)
})

export const getDeckController = catchErrors(async (req, res) => {
  const { deckId } = deckParamsSchema.parse(req.params)
  const userId = getAuthUserId(req)

  const deck = await getDeck(userId, deckId)

  res.status(OK).json({
    id: deck._id.toString(),
    title: deck.title,
    description: deck.description,
  })
})

export const getDeckStatsController = catchErrors(async (req, res) => {
  const { deckId } = deckParamsSchema.parse(req.params)
  const userId = getAuthUserId(req)

  const stats = await getDeckStats(userId, deckId)

  res.status(OK).json(stats)
})

export const updateDeckController = catchErrors(async (req, res) => {
  const { deckId } = deckParamsSchema.parse(req.params)
  const body = updateDeckSchema.parse(req.body)
  const userId = getAuthUserId(req)

  const deck = await updateDeck(userId, deckId, body)

  res.status(OK).json(deck)
})

export const deleteDeckController = catchErrors(async (req, res) => {
  const { deckId } = deckParamsSchema.parse(req.params)
  const userId = getAuthUserId(req)

  await deleteDeck(userId, deckId)

  res.sendStatus(NO_CONTENT)
})

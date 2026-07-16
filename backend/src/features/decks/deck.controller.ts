import catchErrors from "../../utils/catchErrors.js"
import { CREATED, OK } from "../../constants/http.js"
import { createDeckSchema } from "./deck.schemas.js"
import { createDeck, getDecks } from "./deck.service.js"
import { getAuthUserId } from "../auth/auth.utils.js"

export const getDecksController = catchErrors(async (req, res) => {
  const userId = getAuthUserId(req)

  const decks = await getDecks(userId)

  res.status(OK).json(decks)
})

export const createDeckController = catchErrors(async (req, res) => {
  const body = createDeckSchema.parse(req.body)
  const userId = getAuthUserId(req)

  const deck = await createDeck(userId, body)

  res.status(CREATED).json(deck)
})

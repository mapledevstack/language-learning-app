import api from "@/utils/api"
import {
  DeckSchema,
  DecksSchema,
  type CreateDeckInput,
  type UpdateDeckInput,
} from "../schemas/DeckSchema"

export const createDeck = (input: CreateDeckInput) => api.post("/decks", input)

export const getDecks = async () => {
  const response = await api.get("/decks")
  return DecksSchema.parse(response)
}

export const getDeck = async (deckId: string) => {
  const response = await api.get(`/decks/${deckId}`)
  return DeckSchema.parse(response)
}

export const deleteDeck = (deckId: string) => api.delete(`/decks/${deckId}`)

export const updateDeck = (deckId: string, input: UpdateDeckInput) =>
  api.patch(`/decks/${deckId}`, input)

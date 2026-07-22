import api from "@/utils/api"
import {
  FlashCardsSchema,
  type CreateFlashCardSchema,
  type UpdateFlashCardSchema,
} from "../schemas/FlashCardSchema"

export const createFlashCard = (input: CreateFlashCardSchema) =>
  api.post("/flashcards", input)

export const getFlashCards = async (deckId: string) => {
  const response = await api.get(`/flashcards/deck/${deckId}`)
  return FlashCardsSchema.parse(response)
}

export const updateFlashCard = (
  flashCardId: string,
  input: UpdateFlashCardSchema,
) => api.patch(`/flashcards/${flashCardId}`, input)

export const deleteFlashCard = (flashCardId: string) =>
  api.delete(`/flashcards/${flashCardId}`)

export const getDueFlashCards = async (deckId: string) => {
  const response = await api.get(`/flashcards/deck/${deckId}/due`)
  return FlashCardsSchema.parse(response)
}

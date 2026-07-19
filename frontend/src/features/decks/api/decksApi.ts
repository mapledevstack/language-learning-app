import api from "@/utils/api"
import { DecksSchema, type CreateDeckInput } from "../schemas/DeckSchema"

export const createDeck = (input: CreateDeckInput) => api.post("/decks", input)

export const getDecks = async () => {
  const response = await api.get("/decks")
  console.log(response)

  return DecksSchema.parse(response)
}

import api from "@/utils/api"
import type { CreateFlashCardSchema } from "../schemas/FlashCardSchema"

export const createFlashCard = (input: CreateFlashCardSchema) =>
  api.post("/flashcards", input)

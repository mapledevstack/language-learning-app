import catchErrors from "../../utils/catchErrors.js"
import { CREATED } from "../../constants/http.js"
import { createFlashCard } from "./flashcard.service.js"
import { getAuthUserId } from "../auth/auth.utils.js"
import { createFlashCardSchema } from "./flashcard.schema.js"

export const createFlashCardController = catchErrors(async (req, res) => {
  const body = createFlashCardSchema.parse(req.body)
  const userId = getAuthUserId(req)

  const flashCard = await createFlashCard(userId, body)

  res.status(CREATED).json(flashCard)
})

import { OK } from "../../constants/http.js"
import catchErrors from "../../utils/catchErrors.js"
import { searchGrammarSchema } from "./grammar.schemas.js"
import { searchGrammar } from "./grammar.service.js"

export const searchGrammarController = catchErrors(async (req, res) => {
  const { q, limit } = searchGrammarSchema.parse(req.query)

  const results = await searchGrammar(q, limit)

  return res.status(OK).json(results)
})

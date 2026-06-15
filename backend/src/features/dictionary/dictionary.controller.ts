import { Request, Response } from "express"
import { searchWords } from "./dictionary.service.js"

export const searchWordsController = async (req: Request, res: Response) => {
  const query = String(req.query.q ?? "")

  const words = await searchWords(query)

  res.json(words)
}

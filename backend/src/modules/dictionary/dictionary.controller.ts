import { Request, Response } from "express"
import { getAllWords } from "./dictionary.service.js"

export const getAllWordsController = (req: Request, res: Response) => {
  const words = getAllWords()
  
  return res.json(words)
}

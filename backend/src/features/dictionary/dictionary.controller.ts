import { Request, Response } from "express";
import { getAllWords } from "./dictionary.service.js";

export const getAllWordsController = async(req: Request, res: Response) => {
  try{
    const words = await getAllWords()
    res.status(200).json(words)
  } catch(error) {
    console.error(error)
    res.status(500).json({message: "Failed to fetch words"})
  }
}

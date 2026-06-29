import { Request, Response } from "express"
import {
  getKanji,
  getKanjis,
  getSearchFromMeaning,
  getSearchResults,
  getSentences,
} from "./dictionary.service.js"
import { searchQuerySchema } from "./dictionary.schema.js"
import catchErrors from "../../utils/catchErrors.js"
import { BAD_REQUEST, OK } from "../../constants/http.js"
import AppError from "../../utils/appError.js"

export const getKanjiController = async (req: Request, res: Response) => {
  const query = req.query.q

  if (typeof query !== "string" || !query.trim()) {
    throw new Error("valid query required for kanji")
  }

  const result = await getKanji(query.trim())

  res.json(result)
}

export const getKanjisController = async (req: Request, res: Response) => {
  const query = req.query.q

  if (
    typeof query !== "string" &&
    !(Array.isArray(query) && query.every((q) => typeof q === "string"))
  ) {
    throw new Error("valid query required for kanjis")
  }

  const kanjis = Array.isArray(query) ? query : [query]

  const result = await getKanjis(kanjis)

  res.json(result)
}

export const getSearchResultsController = catchErrors(async (req, res) => {
  const { q, limit } = searchQuerySchema.parse(req.query)

  const results = await getSearchResults(q, limit)

  res.json(results)
})

export const searchFromMeaningController = catchErrors(async (req, res) => {
  const request = searchQuerySchema.parse(req.query)

  const results = await getSearchFromMeaning(request.q, request.limit)

  return res.status(OK).json(results)
})

export const getSentencesController = catchErrors(async (req, res) => {
  const { q, limit = 3 } = req.query

  if (!q || typeof q !== "string") {
    throw new AppError("Search query is required", BAD_REQUEST)
  }

  const sentences = await getSentences(q, Number(limit))

  return res.status(OK).json(sentences)
})

import { Request, Response } from "express"
import { getKanji, getKanjis, getSearchResults } from "./dictionary.service.js"

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

export const getSearchResultsController = async (
  req: Request,
  res: Response,
) => {
  const query = req.query.q
  const limit = Number(req.query.limit) || 30

  if (typeof query !== "string" || !query.trim()) {
    throw new Error("search query not valid")
  }

  const results = await getSearchResults(query, limit)

  res.json(results)
}

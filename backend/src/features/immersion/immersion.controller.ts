import { Request, Response } from "express"
import { getSubtitles, getVideos } from "./immersion.service.js"
import catchAsync from "../../middleware/catchAsync.js"

export const getVideosController = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query.q

    if (typeof query !== "string" || !query.trim()) {
      throw new Error("search query required")
    }

    const videos = await getVideos(query)
    res.json(videos)
  },
)

export const getSubtitlesController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    if (typeof id !== "string") {
      throw new Error("Video Id not valid")
    }

    const subtitles = await getSubtitles(id)
    res.json(subtitles)
  },
)

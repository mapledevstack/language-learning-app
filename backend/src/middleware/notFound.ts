import { NextFunction, Request, Response } from "express"

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404)

  const error = new Error(`${req.originalUrl} not found`)
  next(error)
}

export default notFound

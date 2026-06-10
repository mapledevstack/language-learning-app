import { NextFunction, Request, Response } from "express"

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(res.statusCode === 200 ? 500 : res.statusCode)
  res.json({ message: err.message })
}

export default errorHandler

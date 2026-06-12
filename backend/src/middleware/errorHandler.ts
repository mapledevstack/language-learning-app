import { NextFunction, Request, Response } from "express"
import ErrorResponse from "../interfaces/error-response.js"

const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
) => {
  res.status(res.statusCode === 200 ? 500 : res.statusCode)

  res.json({ message: err.message, stack: err.stack })
}

export default errorHandler

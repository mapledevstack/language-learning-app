import { NextFunction, Request, Response } from "express"
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "../constants/http.js"
import ErrorResponse from "../interfaces/error-response.js"
import { NODE_ENV } from "../constants/env.js"
import { z, ZodError } from "zod"
import AppError from "../utils/appError.js"

const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(BAD_REQUEST).json({
      path: req.originalUrl,
      message: z.prettifyError(err),
    })
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      path: req.originalUrl,
      message: err.message,
    })
  }

  console.error(err.stack)

  return res
    .status(res.statusCode !== OK ? res.statusCode : INTERNAL_SERVER_ERROR)
    .json({
      path: req.originalUrl,
      message:
        NODE_ENV === "development" ? err.message : "Internal Server Error",
    })
}

export default errorHandler

import { RequestHandler } from "express"
import { NOT_FOUND } from "../constants/http.js"

const notFound: RequestHandler = (req, res, next) => {
  res.status(NOT_FOUND)

  const error = new Error(`${req.originalUrl} not found`)
  next(error)
}

export default notFound

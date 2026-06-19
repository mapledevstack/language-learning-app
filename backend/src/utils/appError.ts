import { HttpStatusCode } from "../constants/http.js"

class AppError extends Error {
  constructor(
    message: string,
    public statusCode: HttpStatusCode,
  ) {
    super(message)
  }
}

export default AppError

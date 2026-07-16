import express from "express"
import cors from "cors"
import morgan from "morgan"
import dictionaryRoutes from "./features/dictionary/dictionary.routes.js"
import immersionRoutes from "./features/immersion/immersion.routes.js"
import errorHandler from "./middleware/errorHandler.js"
import notFound from "./middleware/notFound.js"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import { APP_ORIGIN } from "./constants/env.js"
import { OK } from "./constants/http.js"
import authRoutes from "./features/auth/auth.routes.js"
import authenticate from "./middleware/authenticate.js"
import userRoutes from "./features/users/user.routes.js"
import sessionRoutes from "./features/auth/session.routes.js"
import grammarRoutes from "./features/grammar/grammar.routes.js"
import deckRoutes from "./features/decks/deck.routes.js"
import flashCardRoutes from "./features/flashcards/flashcard.routes.js"

const app = express()

app.use(express.json())
app.use(cors({ origin: APP_ORIGIN, credentials: true }))
app.use(cookieParser())
app.use(morgan("dev"))
app.use(helmet())

app.get("/api/v1", (_, res) => res.status(OK).json({ status: "healthy" }))

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/me", authenticate, userRoutes)
app.use("/api/v1/sessions", authenticate, sessionRoutes)

app.use("/api/v1/dictionary", dictionaryRoutes)
app.use("/api/v1/immersion", immersionRoutes)
app.use("/api/v1/grammar", grammarRoutes)
app.use("/api/v1/decks", authenticate, deckRoutes)
app.use("/api/v1/flashcards", authenticate, flashCardRoutes)

app.use(notFound)
app.use(errorHandler)

export default app

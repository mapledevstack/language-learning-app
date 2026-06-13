import express from "express"
import cors from "cors"
import morgan from "morgan"
import dictionaryRoutes from "./features/dictionary/dictionary.routes.js"
import immersionRoutes from "./features/immersion/immersion.routes.js"
import errorHandler from "./middleware/errorHandler.js"
import notFound from "./middleware/notFound.js"
import helmet from "helmet"

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(helmet())

app.use("/api/v1/dictionary", dictionaryRoutes)
app.use("/api/v1/immersion", immersionRoutes)

app.use(notFound)
app.use(errorHandler)

export default app

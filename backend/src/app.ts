import express from "express"
import dictionaryRoutes from "./features/dictionary/dictionary.routes.js"

const app = express()

app.use(express.json())

app.use('/api/dictionary', dictionaryRoutes)

export default app

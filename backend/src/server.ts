import app from "./app.js"
import "dotenv/config"
import { connectDB } from "./config/db.js"

const PORT = 3000
const MONGO_URI = process.env.MONGO_URI

await connectDB(MONGO_URI)

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
})

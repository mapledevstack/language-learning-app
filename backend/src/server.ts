import app from "./app.js"
import connectDB from "./config/db.js"
import { NODE_ENV, PORT } from "./constants/env.js"

await connectDB()

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT} in ${NODE_ENV} environment`)
})

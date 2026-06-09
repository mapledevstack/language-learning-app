import app from "./app.js"
import mongoose from "mongoose"
import "dotenv/config"

const PORT = 3000
const MONGO_URI = process.env.MONGO_URI

if(!MONGO_URI) {
  throw new Error("MONGO_URI not defined")
}

try {
  await mongoose.connect(MONGO_URI)
  console.log("MongoDB connected")
  
  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
  })
} catch(error) {
  console.error(error)
}

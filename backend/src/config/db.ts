import mongoose from "mongoose"
import { MONGO_URI } from "../constants/env.js"

const connectDB = async (retries = 3) => {
  if (retries === 0) {
    process.exit(1)
  }

  try {
    await mongoose.connect(MONGO_URI)
    console.log("MongoDB connected")
  } catch (error) {
    console.log(`Could not connect to DB`, error)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    return connectDB(retries - 1)
  }
}

export default connectDB

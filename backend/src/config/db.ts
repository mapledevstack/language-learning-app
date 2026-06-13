import mongoose from "mongoose"

export const connectDB = async (mongoUri: string | undefined) => {
  if (!mongoUri) {
    throw new Error("MONGO_URI not defined")
  }

  try {
    await mongoose.connect(mongoUri)
    console.log("MongoDB connected")
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

import mongoose from "mongoose"

const globalSetup = async () => {
  return async () => {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.dropDatabase()
      await mongoose.connection.close()
    }
  }
}

export default globalSetup

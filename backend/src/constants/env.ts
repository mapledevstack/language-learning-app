import "dotenv/config"
import z from "zod"

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] ?? defaultValue

  if (value === undefined) {
    throw new Error(`Missing environment variable ${key}`)
  }

  return value
}

const nodeEnvSchema = z
  .enum(["development", "production", "test"])
  .default("development")

export const PORT = getEnv("PORT", "3000")
export const NODE_ENV = nodeEnvSchema.parse(getEnv("NODE_ENV", "development"))
export const MONGO_URI = getEnv("MONGO_URI")
export const YOUTUBE_API_KEY = getEnv("YOUTUBE_API_KEY")
export const APP_ORIGIN = getEnv("APP_ORIGIN")
export const JWT_SECRET = getEnv("JWT_SECRET")
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET")

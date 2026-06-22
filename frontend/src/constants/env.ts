const getEnv = (key: string, defaulValue?: string): string => {
  const value = import.meta.env[key] ?? defaulValue

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }

  return value
}

export const API_BASE_URL = getEnv("VITE_API_BASE_URL")
export const IS_DEV = import.meta.env.DEV

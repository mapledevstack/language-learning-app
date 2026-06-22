import { API_BASE_URL } from "@/constants/env"

const api = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message)
  }

  return data
}

export default api

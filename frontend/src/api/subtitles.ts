import type { Subtitles } from "@/schemas/SubtitlesSchema"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getSubtitles = async (vidId: string) => {
  const res = await fetch(`${API_BASE_URL}/immersion/videos/${vidId}/subtitles`)
  const data: Subtitles = await res.json()

  return data
}

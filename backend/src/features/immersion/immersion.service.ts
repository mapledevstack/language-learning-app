import { fetchTranscript } from "youtube-transcript"

export const searchVideos = (query: string) => {
  return query
}

export const getSubtitles = async (vidId: string) => {
  const subtitles = await fetchTranscript(vidId, { lang: "ja" })

  return subtitles
}

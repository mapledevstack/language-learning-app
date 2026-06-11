import { getSubtitles } from "@/api/subtitles"
import { useSuspenseQuery } from "@tanstack/react-query"

const useSubtitles = (vidId: string) => {
  return useSuspenseQuery({
    queryKey: ["subtitles", vidId],
    queryFn: () => getSubtitles(vidId),
  })
}

export default useSubtitles

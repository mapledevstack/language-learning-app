import { useSuspenseQuery } from "@tanstack/react-query"
import { getSubtitles } from "../api/immersionApi"

const useSubtitles = (vidId: string) => {
  return useSuspenseQuery({
    queryKey: ["subtitles", vidId],
    queryFn: () => getSubtitles(vidId),
  })
}

export default useSubtitles

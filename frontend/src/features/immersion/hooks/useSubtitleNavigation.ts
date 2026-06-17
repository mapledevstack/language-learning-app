import type { Subtitles } from "@/schemas/SubtitlesSchema"
import { useEffect } from "react"
import type { YouTubePlayer } from "react-youtube"

type Props = {
  player: YouTubePlayer
  subtitles: Subtitles
  activeSubtitleIndex: number
  nearestSubtitleIndex: number
}

const useSubtitleNavigation = ({
  player,
  subtitles,
  activeSubtitleIndex,
  nearestSubtitleIndex,
}: Props) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!["ArrowUp", "ArrowLeft", "ArrowRight", " "].includes(e.key)) return
      e.preventDefault()

      if (subtitles.length === 0) return

      const seekPreviousSubtitle = () => {
        if (nearestSubtitleIndex === 0) {
          player.seekTo(0, true)
          return
        }
        if (
          nearestSubtitleIndex === subtitles.length - 1 &&
          activeSubtitleIndex === -1
        ) {
          player.seekTo(subtitles[nearestSubtitleIndex].offset / 1000, true)
          return
        }
        player.seekTo(subtitles[nearestSubtitleIndex - 1].offset / 1000, true)
      }

      const seekNextSubtitle = () => {
        if (nearestSubtitleIndex === subtitles.length - 1) {
          player.seekTo(player.getDuration() - 1.5, true)
          return
        }
        if (nearestSubtitleIndex === 0 && activeSubtitleIndex === -1) {
          player.seekTo(subtitles[nearestSubtitleIndex].offset / 1000, true)
          return
        }
        player.seekTo(subtitles[nearestSubtitleIndex + 1].offset / 1000, true)
      }

      switch (e.key) {
        case "ArrowUp":
          player.seekTo(subtitles[nearestSubtitleIndex].offset / 1000, true)
          break
        case "ArrowLeft":
          seekPreviousSubtitle()
          break
        case "ArrowRight":
          seekNextSubtitle()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [player, subtitles, nearestSubtitleIndex, activeSubtitleIndex])
}

export default useSubtitleNavigation

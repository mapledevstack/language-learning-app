import Card from "@/components/Card"
import useSubtitles from "../hooks/useSubtitles"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import type { YouTubePlayer } from "react-youtube"

type Props = {
  player: YouTubePlayer
  vidId: string
  currentTime: number
  handleSeek: (seekTime: number | "start" | "end") => void
}

const SubtitleCard = ({ player, vidId, currentTime, handleSeek }: Props) => {
  const { data: subtitles } = useSubtitles(vidId)

  const activeSubRef = useRef<HTMLDivElement | null>(null)

  const activeSubtitleIndex = subtitles.findIndex(
    (sub) =>
      currentTime >= sub.offset && currentTime < sub.offset + sub.duration,
  )

  const nearestSubtitleIndex =
    activeSubtitleIndex !== -1
      ? activeSubtitleIndex
      : Math.max(
          subtitles.findLastIndex((sub) => sub.offset <= currentTime),
          0,
        )

  useEffect(() => {
    activeSubRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }, [activeSubtitleIndex])

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
  }, [subtitles, nearestSubtitleIndex, activeSubtitleIndex, handleSeek])

  const colorCode = () => {}

  return (
    <Card className="flex-1 overflow-y-scroll overflow-x-hidden flex flex-col items-start gap-1">
      {subtitles.map((sub, index) => {
        return (
          <div
            className={cn(
              "w-full text-2xl text-muted-foreground/60 hover:bg-accent rounded-xl transition-all duration-200 group",
              index === activeSubtitleIndex &&
                "text-card-foreground text-[1.6rem]",
            )}
            key={index}
            ref={index === activeSubtitleIndex ? activeSubRef : null}
            onClick={(e) => {
              if (e.target !== e.currentTarget) return
              handleSeek(sub.offset)
            }}
          >
            <div
              className="flex max-w-full w-fit flex-wrap"
              onMouseEnter={() => player.pauseVideo()}
              onMouseLeave={() => player.playVideo()}
            >
              {sub.tokens.map((token, index) => {
                return (
                  <span
                    key={index}
                    className="hover:bg-sidebar-primary/90 transition-all rounded-md whitespace-nowrap duration-300 p-1 -m-1 cursor-pointer"
                  >
                    {token.text}
                  </span>
                )
              })}
            </div>
          </div>
        )
      })}
    </Card>
  )
}
export default SubtitleCard

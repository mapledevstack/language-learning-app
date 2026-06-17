import Card from "@/components/Card"
import useSubtitles from "../hooks/useSubtitles"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type Props = {
  vidId: string
  currentTime: number
  handleSeek: (seekTime: number | "start" | "end") => void
}

const SubtitleCard = ({ vidId, currentTime, handleSeek }: Props) => {
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
      if (!["ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) return
      e.preventDefault()

      if (subtitles.length === 0) return

      switch (e.key) {
        case "ArrowUp":
          handleSeek(subtitles[nearestSubtitleIndex].offset)
          break
        case "ArrowLeft": {
          if (nearestSubtitleIndex === 0) handleSeek("start")
          else if (
            nearestSubtitleIndex === subtitles.length - 1 &&
            activeSubtitleIndex === -1
          )
            handleSeek(subtitles[nearestSubtitleIndex].offset)
          else handleSeek(subtitles[nearestSubtitleIndex - 1].offset)
          break
        }
        case "ArrowRight": {
          if (nearestSubtitleIndex === subtitles.length - 1) handleSeek("end")
          else if (nearestSubtitleIndex === 0 && activeSubtitleIndex === -1)
            handleSeek(subtitles[nearestSubtitleIndex].offset)
          else handleSeek(subtitles[nearestSubtitleIndex + 1].offset)
          break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [subtitles, nearestSubtitleIndex, activeSubtitleIndex, handleSeek])

  useEffect(() => {
    console.log(`Active`, activeSubtitleIndex)
    console.log("Nearest", nearestSubtitleIndex)
  }, [activeSubtitleIndex, nearestSubtitleIndex])

  const colorCode = () => {}

  return (
    <Card className="flex-1 overflow-y-scroll overflow-x-hidden flex flex-col items-start gap-1">
      {subtitles.map((sub, index) => {
        return (
          <div
            className={cn(
              "w-full text-2xl text-muted-foreground/60 hover:bg-accent rounded-xl transition-all duration-200",
              index === activeSubtitleIndex &&
                "text-card-foreground text-[1.6rem]",
            )}
            key={index}
            ref={index === activeSubtitleIndex ? activeSubRef : null}
            onClick={() => handleSeek(sub.offset)}
          >
            <div className="flex w-full flex-wrap">
              {sub.tokens.map((token, index) => {
                return (
                  <div
                    key={index}
                    className="hover:bg-sidebar-primary/90 transition-all rounded-md whitespace-nowrap duration-300 p-1 -m-1 cursor-pointer"
                  >
                    {token.text}
                  </div>
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

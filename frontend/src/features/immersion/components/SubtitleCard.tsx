import Card from "@/components/Card"
import useSubtitles from "../hooks/useSubtitles"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type Props = {
  currentTime: number
  setCurrentTime: (currentTime: number) => void
}

const vidId = "C3oPjuudXas"

const SubtitleCard = ({ currentTime, setCurrentTime }: Props) => {
  const { data: subtitles } = useSubtitles(vidId)

  const activeSubRef = useRef<HTMLDivElement | null>(null)

  const currentTimeMs = currentTime * 1000
  const activeSubtitleIndex = subtitles.findIndex(
    (sub) =>
      currentTimeMs >= sub.offset && currentTimeMs < sub.offset + sub.duration,
  )

  useEffect(() => {
    activeSubRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }, [activeSubtitleIndex])

  const colorCode = () => {}

  return (
    <Card className="flex-1 overflow-y-scroll flex flex-col items-start gap-1">
      {subtitles.map((sub, index) => {
        return (
          <div
            className={cn(
              "text-2xl text-muted-foreground transition-all",
              index === activeSubtitleIndex && "text-foreground",
            )}
            key={index}
            ref={index === activeSubtitleIndex ? activeSubRef : null}
          >
            {sub.text}
          </div>
        )
      })}
    </Card>
  )
}
export default SubtitleCard

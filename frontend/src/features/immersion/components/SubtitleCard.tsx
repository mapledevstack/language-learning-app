import Card from "@/components/Card"
import useSubtitles from "../hooks/useSubtitles"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type Props = {
  vidId: string
  currentTime: number
  setCurrentTime: (currentTime: number) => void
}

const SubtitleCard = ({ vidId, currentTime, setCurrentTime }: Props) => {
  const { data: subtitles } = useSubtitles(vidId)

  const activeSubRef = useRef<HTMLDivElement | null>(null)

  const activeSubtitleIndex = subtitles.findIndex(
    (sub) =>
      currentTime >= sub.offset && currentTime < sub.offset + sub.duration,
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
              "text-2xl text-muted-foreground/60 transition-all duration-200",
              index === activeSubtitleIndex &&
                "text-card-foreground text-[1.6rem]",
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

import Card from "@/components/cards/Card"
import useSubtitles from "../hooks/useSubtitles"
import { useEffect, useRef } from "react"
import { cn } from "@/utils/cn"
import type { YouTubePlayer } from "react-youtube"
import useSubtitleNavigation from "../hooks/useSubtitleNavigation"

type Props = {
  player: YouTubePlayer
  vidId: string
  currentTime: number
  handleSeek: (seekTime: number | "start" | "end") => void
  setSearch: (search: string) => void
}

const SubtitleCard = ({
  player,
  vidId,
  currentTime,
  handleSeek,
  setSearch,
}: Props) => {
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

  useSubtitleNavigation({
    player,
    subtitles,
    activeSubtitleIndex,
    nearestSubtitleIndex,
  })

  const colorCode = () => {}

  return (
    <Card className="flex-1 overflow-y-scroll overflow-x-hidden flex flex-col items-start gap-1 p-4">
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
                    onClick={() => setSearch(token.baseForm)}
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

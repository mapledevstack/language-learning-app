import WordCard from "@/features/dictionary/components/WordCard"
import SubtitleCard from "../components/SubtitleCard"
import VideoCard from "../components/VideoCard"
import { Suspense, useEffect, useState } from "react"
import type { YouTubePlayer } from "react-youtube"
import { Route } from "@/routes/_app/immersion/$vidId"
import { ErrorBoundary } from "react-error-boundary"
import useWordSearch from "@/features/dictionary/hooks/useWordSearch"
import { LucideChevronLeft, LucideChevronRight } from "lucide-react"
import EmptyCard from "@/components/cards/EmptyCard"

const ImmersionWatchPage = () => {
  const [player, setPlayer] = useState<YouTubePlayer | undefined>()
  const [currentTime, setCurrentTime] = useState(0)
  const [search, setSearch] = useState("")
  const [resultIndex, setResultIndex] = useState(0)

  const [sideBar, setSideBar] = useState<"wordDetails" | "videoStats">(
    "wordDetails",
  )

  const { data: results = [] } = useWordSearch(search, "word", 30)

  const { vidId } = Route.useParams()

  useEffect(() => {
    if (!player) return

    const interval = setInterval(() => {
      const time = player.getCurrentTime()
      setCurrentTime(time * 1000)
    }, 250)

    return () => clearInterval(interval)
  }, [player])

  const handleSeek = (seekTimeMs: number | "start" | "end") => {
    if (!player) return

    if (seekTimeMs === "start") {
      player.seekTo(0, true)
      return
    }

    if (seekTimeMs === "end") {
      player.seekTo(player.getDuration() - 1.5, true)
      return
    }

    player.seekTo(seekTimeMs / 1000, true)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!player) return
      if (e.key === " ") {
        if (player.getPlayerState() === 1) player.pauseVideo()
        else player.playVideo()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [player])

  useEffect(() => {
    setResultIndex(0)
  }, [search])
  // To-do: change this so that Arrows Component can reset Index by just rerendering a new component using 'key'

  return (
    <div className="h-full w-full grid md:grid-cols-[6.5fr_3.5fr] p-10 gap-4">
      <section className="flex-1 md:overflow-hidden flex flex-col gap-4">
        <VideoCard vidId={vidId} setPlayer={setPlayer} />

        <ErrorBoundary fallback={<p>No Japanese Subtitles Found</p>}>
          <Suspense fallback={<p>Loading subtitles...</p>}>
            <SubtitleCard
              player={player}
              vidId={vidId}
              currentTime={currentTime}
              handleSeek={handleSeek}
              setSearch={setSearch}
            />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section className="flex flex-col h-full min-h-0 gap-2 overflow-x-hidden">
        <div className="bg-card p-4 w-full rounded-lg flex gap-4 text-center font-bold text-accent-foreground">
          <div
            className={`flex-1 cursor-pointer hover:bg-primary transition-all p-2 rounded-lg border-2 ${
              sideBar === "wordDetails"
                ? "border-accent-foreground"
                : "border-transparent"
            } tracking-wider`}
            onClick={() => setSideBar("wordDetails")}
          >
            Word Details
          </div>
          <div
            className={`flex-1 cursor-pointer hover:bg-primary transition-all p-2 rounded-lg border-2 ${
              sideBar === "videoStats"
                ? "border-accent-foreground"
                : "border-transparent"
            } tracking-wider`}
            onClick={() => setSideBar("videoStats")}
          >
            Video Stats
          </div>
        </div>
        {sideBar === "wordDetails" ? (
          <div className="flex-1 min-h-0 overflow-y-scroll flex flex-col gap-2">
            <div className="w-full flex">
              <button
                className="flex-1 bg-card p-4 rounded-lg grid place-items-center disabled:text-muted not-disabled:bg-accent text-accent-foreground not-disabled:hover:scale-105 transition-all m-2"
                onClick={() =>
                  setResultIndex((index) => (index === 0 ? index : index - 1))
                }
                disabled={resultIndex === 0}
              >
                <LucideChevronLeft />
              </button>
              <button
                className="flex-1 bg-card p-4 rounded-lg grid place-items-center disabled:text-muted not-disabled:bg-accent text-accent-foreground not-disabled:hover:scale-105 transition-all m-2"
                onClick={() =>
                  setResultIndex((index) =>
                    index === results.length - 1 ? index : index + 1,
                  )
                }
                disabled={
                  results.length === 0 || resultIndex === results.length - 1
                }
              >
                <LucideChevronRight />
              </button>
            </div>
            <div className="flex-1 min-h-0">
              {results.length > 0 ? (
                <WordCard
                  key={results[resultIndex].wordId}
                  word={results[resultIndex]}
                />
              ) : (
                <EmptyCard text="Select a word" />
              )}
            </div>
          </div>
        ) : (
          <EmptyCard text="Video Stats Coming Soon" />
        )}
      </section>
    </div>
  )
}
export default ImmersionWatchPage

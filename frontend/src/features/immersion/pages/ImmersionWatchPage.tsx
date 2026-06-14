import WordCard from "@/features/dictionary/components/WordCard"
import { DeckSchema, type Deck } from "@/schemas/DeckSchema"
import SubtitleCard from "../components/SubtitleCard"
import VideoCard from "../components/VideoCard"
import { Suspense, useEffect, useState } from "react"
import type { YouTubePlayer } from "react-youtube"
import { Route } from "@/routes/_app/immersion/$vidId"
import { ErrorBoundary } from "react-error-boundary"

const ImmersionWatchPage = () => {
  const [player, setPlayer] = useState<YouTubePlayer | undefined>()
  const [currentTime, setCurrentTime] = useState(0)

  const { vidId } = Route.useParams()

  useEffect(() => {
    if (!player) return

    const interval = setInterval(() => {
      const time = player.getCurrentTime()
      if (time !== currentTime) {
        setCurrentTime(time * 1000)
      }
    }, 250)

    return () => clearInterval(interval)
  }, [player])

  return (
    <div className="h-full w-full grid md:grid-cols-[6.5fr_3.5fr] p-10 gap-4">
      <section className="flex-1 md:overflow-hidden flex flex-col gap-4">
        <VideoCard
          vidId={vidId}
          setPlayer={setPlayer}
          setCurrentTime={setCurrentTime}
        />

        <ErrorBoundary fallback={<p>No Japanese Subtitles Found</p>}>
          <Suspense fallback={<p>Loading subtitles...</p>}>
            <SubtitleCard
              vidId={vidId}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
            />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section className="flex flex-col">
        <p>Vid Stats or WordDetails Switch</p>
        <WordCard word={word} decks={decks} />
      </section>
    </div>
  )
}
export default ImmersionWatchPage

const word = {
  id: 1000290,
  spellings: ["食べる"],
  readings: ["たべる"],
  meanings: ["to eat"],
  partsOfSpeech: ["Ichidan verb"],
  jlpt: "N5",
}

const decks: Deck[] = [
  DeckSchema.parse({
    id: 1,
    title: "Hiragana",
    description: "Basic Japanese syllabary",
    cardCount: 46,
    learnedCount: 23,
    dueCount: 26,
  }),

  DeckSchema.parse({
    id: 2,
    title: "Katakana",
    description: "Foreign-word syllabary",
    cardCount: 46,
    learnedCount: 2,
    dueCount: 46,
  }),
]

import WordCard from "@/features/dictionary/components/WordCard"
import { DeckSchema, type Deck } from "@/schemas/DeckSchema"
import SubtitleCard from "../components/SubtitleCard"
import VideoCard from "../components/VideoCard"
import { Suspense, useEffect, useState } from "react"
import type { YouTubePlayer } from "react-youtube"
import { Route } from "@/routes/_app/immersion/$vidId"
import { ErrorBoundary } from "react-error-boundary"
import type { Word } from "@/features/dictionary/schemas/WordSchema"
import useWordSearch from "@/features/dictionary/hooks/useWordSearch"
import { LucideChevronLeft, LucideChevronRight } from "lucide-react"

const ImmersionWatchPage = () => {
  const [player, setPlayer] = useState<YouTubePlayer | undefined>()
  const [currentTime, setCurrentTime] = useState(0)
  const [search, setSearch] = useState("")
  const [resultIndex, setResultIndex] = useState(0)

  const { data: results = [] } = useWordSearch(search, 5)

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
        <div className="bg-card p-4 w-full rounded-lg">
          Vid Stats or WordDetails Switch
        </div>
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
            <WordCard word={results[resultIndex] ?? null} decks={decks} />
          </div>
        </div>
      </section>
    </div>
  )
}
export default ImmersionWatchPage

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

const words: Word[] = [
  {
    wordId: "1000040",
    forms: [
      {
        text: "〃",
        reading: "おなじ",
        furigana: [
          {
            text: "〃",
            reading: "おなじ",
          },
        ],
        common: false,
        tags: [],
        pitchAccent: "LHHH",
      },
    ],
    meanings: [
      {
        definitions: ["ditto mark"],
        partsOfSpeech: ["n"],
        tags: [],
        notes: [],
      },
    ],
  },

  {
    wordId: "1000110",
    forms: [
      {
        text: "ＣＤプレーヤー",
        reading: "シーディープレーヤー",
        furigana: [
          {
            text: "Ｃ",
            reading: "シー",
          },
          {
            text: "Ｄ",
            reading: "ディー",
          },
          {
            text: "プレーヤー",
            reading: null,
          },
        ],
        common: true,
        tags: [],
        pitchAccent: "LHHhHHLLLLL",
      },
      {
        text: "ＣＤプレイヤー",
        reading: "シーディープレイヤー",
        furigana: [
          {
            text: "Ｃ",
            reading: "シー",
          },
          {
            text: "Ｄ",
            reading: "ディー",
          },
          {
            text: "プレイヤー",
            reading: null,
          },
        ],
        common: false,
        tags: [],
        pitchAccent: null,
      },
    ],
    meanings: [
      {
        definitions: ["CD player", "amamamamamama", "Insane omg"],
        partsOfSpeech: ["n"],
        tags: [],
        notes: [],
      },
    ],
  },

  {
    wordId: "1000420",
    forms: [
      {
        text: "彼の",
        reading: "あの",
        furigana: [
          {
            text: "彼",
            reading: "あ",
          },
          {
            text: "の",
            reading: null,
          },
        ],
        common: false,
        tags: ["rK"],
        pitchAccent: "LHH",
      },
      {
        text: "あん",
        reading: "あん",
        furigana: [],
        common: false,
        tags: [],
        pitchAccent: "HLL",
      },
    ],
    meanings: [
      {
        definitions: ["that", "those", "the", "Insane omg"],
        partsOfSpeech: ["adj-pn"],
        tags: ["uk"],
        notes: [
          "someone or something distant from both speaker and listener, or situation unfamiliar to both speaker and listener",
        ],
      },
    ],
  },
]

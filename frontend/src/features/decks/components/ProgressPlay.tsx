import { LucidePlay } from "lucide-react"
import type { Deck } from "../schemas/DeckSchema"
import { Link } from "@tanstack/react-router"
import { cn } from "@/utils/cn"
import useDueFlashCards from "../hooks/useDueFlashCards"
import useFlashCards from "../hooks/useFlashCards"
import { State } from "ts-fsrs"

type Props = {
  deck: Deck
}

const ProgressPlay = ({ deck }: Props) => {
  const { data: dueFlashCards = [], isLoading } = useDueFlashCards(deck.id)
  const { data: flashCards = [] } = useFlashCards(deck.id)

  const newCount = flashCards.filter(
    (card) => card.fsrs.state === State.New,
  ).length

  const progress =
    flashCards.length === 0 ? 0 : 1 - newCount / flashCards.length
  const dueCount = isLoading ? "-" : dueFlashCards.length

  // Switch to deck/:deckId/stats route later for progress and due count

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20">
      <div
        className="p-5 absolute size-20 rounded-full"
        style={{
          background: `conic-gradient(
            white ${(1 - progress) * 100}%,
            var(--color-primary) 0%
          )`,
        }}
      ></div>

      <div className="absolute inset-1 rounded-full bg-card"></div>

      <Link to="/decks/$deckId" params={{ deckId: String(deck.id) }}>
        <div className="inset-2 absolute">
          <div
            className={cn(
              "inset-2 flex text-primary items-center justify-center absolute group-hover:opacity-0 transition-opacity text-3xl",
            )}
          >
            {dueCount}
          </div>
          <div className="inset-2 flex items-center justify-center absolute hover:scale-105 opacity-0 group-hover:opacity-100 transition-all">
            <LucidePlay className="size-12 text-primary-foreground hover:text-primary transition-all" />
          </div>
        </div>
      </Link>
    </div>
  )
}
export default ProgressPlay

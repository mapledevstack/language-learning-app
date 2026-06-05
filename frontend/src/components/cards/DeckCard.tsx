import type { Deck } from "@/schemas-and-types/DeckSchema"
import Card from "./Card"
import { LucideEdit, LucidePlay } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"

type Props = {
  deck: Deck
}

const DeckCard = ({ deck } : Props) => {

  const progress = (deck.learnedCount / deck.cardCount) || 0

  return (
    <Card className="w-(--card-width) bg-accent-muted aspect-3/4 hover:scale-105 transition-transform flex flex-col justify-between p-2 items-center text-center relative">
      
      <h1 className="text-4xl text-primary shadow-sm" >{deck.title}</h1>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20">
        
        <div className="p-5 absolute size-20 rounded-full" style={{
          background: `conic-gradient(
            white ${(1 - progress)*100}%,
            var(--color-primary) 0%
          )`
        }}></div>

        <div className="absolute inset-1 rounded-full bg-card"></div>

        <Link
          to="/decks/$deckId"
          params={{deckId: String(deck.id)}}
        >
          <div className="group inset-2 absolute">
            <div className={cn("inset-2 flex items-center justify-center absolute group-hover:opacity-0 transition-opacity", deck.dueCount < 100 && "text-4xl", deck.dueCount >= 100 && "text-3xl", deck.dueCount >= 1000 && "text-2xl!")}>{deck.dueCount}</div>
            <div className="inset-2 flex items-center justify-center absolute hover:scale-105 opacity-0 group-hover:opacity-100 transition-all">
              <LucidePlay className="size-12 text-primary"/>
            </div>
          </div>
        </Link>

      </div>

      <button className="bg-primary text-2xl p-3 rounded-4xl hover:scale-105 transition-transform text-shadow-md whitespace-nowrap flex items-center justify-center gap-2">
        Edit
        <LucideEdit />
      </button>
    </Card>
  )
}
export default DeckCard

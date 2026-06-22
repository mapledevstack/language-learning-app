import type { Deck } from "@/features/decks/schemas/DeckSchema"
import { LucideEdit, LucideTrash2 } from "lucide-react"
import { Link } from "@tanstack/react-router"
import StudyCard from "@/components/cards/StudyCard"
import ProgressPlay from "./ProgressPlay"
import Badge from "@/components/ui/badge"

type Props = {
  deck: Deck
}

const DeckCard = ({ deck }: Props) => {
  return (
    <StudyCard className="group bg-accent-muted hover:scale-105 transition-transform relative">
      <div className="w-full flex justify-between">
        <Link to="/decks/$deckId/edit" params={{ deckId: String(deck.id) }}>
          <Badge label={`Edit ${deck.title}`} hover={true}>
            <LucideEdit className="size-6" />
          </Badge>
        </Link>

        <Badge label={`Delete ${deck.title}`} hover={true}>
          <LucideTrash2 className="size-6" />
        </Badge>
      </div>

      <ProgressPlay deck={deck} />

      <h1 className="text-4xl text-primary shadow-sm">{deck.title}</h1>
    </StudyCard>
  )
}
export default DeckCard

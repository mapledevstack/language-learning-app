import type { Deck } from "@/schemas/DeckSchema"
import DeckCard from "../cards/DeckCard"

const FlashcardsPage = () => {
  return (
    <div className="h-full flex flex-wrap p-10 gap-8 items-center w-full justify-evenly overflow-y-auto">
      <DeckCard deck={decks[0]} />
      <DeckCard deck={decks[1]} />
      <DeckCard deck={decks[2]} />
    </div>
  )
}
export default FlashcardsPage

const decks: Deck[] = [
  {
    id: 1,
    title: "N5 Core Vocabulary",
    description: "Most common beginner Japanese words",
    cardCount: 120,
    dueCount: 18,
    learnedCount: 40
  },
  {
    id: 2,
    title: "Saved From Dictionary",
    description: "Words you've saved while searching",
    cardCount: 42,
    dueCount: 5,
    learnedCount: 40
  },
  {
    id: 3,
    title: "Anime: Frieren",
    description: "Vocabulary extracted from Frieren",
    cardCount: 87,
    dueCount: 12,
    learnedCount: 40
  },
]

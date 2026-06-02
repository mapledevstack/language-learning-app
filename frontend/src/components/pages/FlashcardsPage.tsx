import type { Deck } from "@/schemas/DeckSchema"
import DeckCard from "../cards/DeckCard"
import { useState } from "react"
import CreateDeckCard from "../cards/CreateDeckCard"

const FlashcardsPage = () => {
  const [decks, setDecks] = useState<Deck[]>(samepleDecks)

  const handleCreateDeck = (title: string) => {
    const newDeck:Deck = {
      id: Date.now(),
      title,
      description: "",
      dueCount: 0,
      cardCount: 0,
      learnedCount: 0
    }

    setDecks(prev => [...prev, newDeck])
  }

  return (
    <div className="h-full flex flex-wrap p-10 gap-8 items-center w-full justify-evenly overflow-y-auto">
      {decks.map(deck => (
        <DeckCard key={deck.id} deck={deck} />
      ))}
      
      <CreateDeckCard handleCreateDeck={handleCreateDeck} />
    </div>
  )
}
export default FlashcardsPage

const samepleDecks: Deck[] = [
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

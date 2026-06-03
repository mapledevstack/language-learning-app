import type { Deck } from "@/schemas/DeckSchema"
import DeckCard from "../cards/DeckCard"
import { useState } from "react"
import CreateDeckCard from "../cards/CreateDeckCard"

const FlashcardsPage = () => {
  const [decks, setDecks] = useState<Deck[]>(basicDecks)

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

const basicDecks: Deck[] = [
  {
    id: 1,
    title: "Hiragana",
    description: "Basic Japanese syllabary",
    cardCount: 46,
    learnedCount: 23,
    dueCount: 46,
  },
  {
    id: 2,
    title: "Katakana",
    description: "Foreign-word syllabary",
    cardCount: 46,
    learnedCount: 2,
    dueCount: 46,
  },
]

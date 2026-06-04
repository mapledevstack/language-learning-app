import { Route } from "@/routes/_app/flashcards/$deckId"
import StudyFlashCard from "../cards/StudyFlashCard"
import type { FlashCard } from "@/schemas/FlashCardSchema"
import type { Deck } from "@/schemas/DeckSchema"
import { useState } from "react"

const FlashCardPage = () => {
  const { deckId: deckIdParam } = Route.useParams()
  const deckId = Number(deckIdParam)
  
  // Find actual deck
  const deck = decks.find(deck => deck.id === deckId)
  
  // Use actual Filtered Flashcards
  const newCards = flashcards.filter(card => card.status === "new").slice(0, deck?.newCardsLimit ?? 20)

  const learningCards = flashcards.filter(card => card.status === "learning")

  const matureCards = flashcards.filter(card => card.status === "mature")

  const allStudyCards = [
    ...learningCards,
    ...newCards,
    ...matureCards
  ]

  const [index, setIndex] = useState(0)
  const [flip, setFlip] = useState<boolean>(false)

  const currentCard = allStudyCards[index]
  
  return (
    <div className="h-full flex flex-col items-center justify-center p-10 relative gap-10">
      
      <StudyFlashCard currentCard={currentCard} flip={flip} />
      
      <div className="text-muted-foreground whitespace-nowrap">
        <span className="text-blue-500">{newCards.length}</span> {" - "}
        <span className="text-red-500">{learningCards.length}</span> {" - "}
        <span className="text-green-500">{matureCards.length}</span>
      </div>
    </div>
  )
}
export default FlashCardPage

export const flashcards: FlashCard[] = [
  {
    id: 1,
    deckId: 1,

    front: {
      expression: "猫"
    },

    back: {
      reading: "ねこ",
      meaning: "Cat"
    },

    dueDate: null,
    lastReviewed: null,
    interval: 0,
    status: "new"
  },

  {
    id: 2,
    deckId: 1,

    front: {
      expression: "学校"
    },

    back: {
      reading: "がっこう",
      meaning: "School"
    },

    dueDate: null,
    lastReviewed: null,
    interval: 0,
    status: "new"
  },

  {
    id: 3,
    deckId: 1,

    front: {
      expression: "食べる"
    },

    back: {
      reading: "たべる",
      meaning: "To eat"
    },

    dueDate: new Date("2026-06-05"),
    lastReviewed: new Date("2026-06-02"),
    interval: 3,
    status: "learning"
  },

  {
    id: 4,
    deckId: 1,

    front: {
      expression: "飲む"
    },

    back: {
      reading: "のむ",
      meaning: "To drink"
    },

    dueDate: new Date("2026-06-11"),
    lastReviewed: new Date("2026-06-04"),
    interval: 7,
    status: "learning"
  },

  {
    id: 5,
    deckId: 1,

    front: {
      expression: "面白い"
    },

    back: {
      reading: "おもしろい",
      meaning: "Interesting"
    },

    dueDate: new Date("2026-07-04"),
    lastReviewed: new Date("2026-06-04"),
    interval: 30,
    status: "mature"
  },

  {
    id: 6,
    deckId: 1,

    front: {
      expression: "昨日、猫を見た。"
    },

    back: {
      reading: "きのう、ねこをみた。",
      meaning: "Yesterday, I saw a cat.",
      source: "Example Sentence"
    },

    dueDate: new Date("2026-06-18"),
    lastReviewed: new Date("2026-06-04"),
    interval: 14,
    status: "mature"
  }
]


const decks: Deck[] = [
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

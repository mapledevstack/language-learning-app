import { Route } from "@/routes/_app/flashcards/$deckId"
import StudyFlashCard from "../cards/StudyFlashCard"
import { FlashCardSchema, type FlashCard } from "@/schemas-and-types/FlashCardSchema"
import { DeckSchema, type Deck } from "@/schemas-and-types/DeckSchema"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { handleAgain, handleGood } from "@/lib/srs"

const FlashCardPage = () => {
  const { deckId: deckIdParam } = Route.useParams()
  const deckId = Number(deckIdParam)
  
  // Find actual deck
  const deck = decks.find(deck => deck.id === deckId)
  
  // Use actual Filtered Flashcards
  const allStudyCards = flashcards.filter(card => card.deckId === deck?.id)

  const [studyCards, setStudyCards] = useState(allStudyCards)
  const [index, setIndex] = useState(0)
  const [flip, setFlip] = useState<boolean>(false)

  const currentCard = studyCards[index]
  const remainingCards = studyCards.slice(index)
  const remainingCount = {
    new: remainingCards.filter(card => card.status === "new").length,
    learning: remainingCards.filter(card => card.status === "learning").length,
    review: remainingCards.filter(card => card.status === "review").length
  }

  useEffect(() => {
    const handleKey = ({ key } : KeyboardEvent) => {
      if(!flip && key === "ArrowUp") {
        setFlip(true)
        return
      }

    if(flip && key === "ArrowLeft") {
        
        handleAgain(currentCard)      
        setFlip(false)
        setIndex(prev => prev + 1)
    } else if(flip && key === "ArrowRight") {
        
        handleGood(currentCard)
        setFlip(false)
        setIndex(prev => prev + 1)
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [flip, currentCard])
  
  if(!currentCard) {
    return (
      <div>No Cards to Study</div>
    )
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-10 relative gap-10">
      
      <StudyFlashCard currentCard={currentCard} flip={flip} />
      
      <div className="text-muted-foreground whitespace-nowrap">
        <span className={cn("text-blue-500", currentCard.status === "new" ? "underline" : "")}>{remainingCount.new}</span> {" - "}
        <span className={cn("text-red-500", currentCard.status === "learning" ? "underline" : "")}>{remainingCount.learning}</span> {" - "}
        <span className={cn("text-green-500", currentCard.status === "review" ? "underline" : "")}>{remainingCount.review}</span>
      </div>
    </div>
  )
}
export default FlashCardPage


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
  })
]


const flashcards: FlashCard[] = [
  FlashCardSchema.parse({
    id: 1,
    deckId: 1,

    front: {
      expression: "猫",
    },

    back: {
      reading: "ねこ",
      meaning: "Cat",
    },

    status: "learning",
    dueDate: new Date()
  }),

  FlashCardSchema.parse({
    id: 2,
    deckId: 1,

    front: {
      expression: "学校",
    },

    back: {
      reading: "がっこう",
      meaning: "School",
    },

    dueDate: new Date(),
  }),

  FlashCardSchema.parse({
    id: 3,
    deckId: 1,

    front: {
      expression: "食べる",
    },

    back: {
      reading: "たべる",
      meaning: "To eat",
    },

    dueDate: new Date("2026-06-05"),
  }),

  FlashCardSchema.parse({
    id: 4,
    deckId: 1,

    front: {
      expression: "飲む",
    },

    back: {
      reading: "のむ",
      meaning: "To drink",
    },

    dueDate: new Date("2026-06-11"),
  }),

  FlashCardSchema.parse({
    id: 5,
    deckId: 1,

    front: {
      expression: "面白い",
    },

    back: {
      reading: "おもしろい",
      meaning: "Interesting",
    },

    dueDate: new Date("2026-07-04"),
  }),

  FlashCardSchema.parse({
    id: 6,
    deckId: 1,

    front: {
      expression: "昨日、猫を見た。",
    },

    back: {
      reading: "きのう、ねこをみた。",
      meaning: "Yesterday, I saw a cat.",
      source: "Example Sentence",
    },

    dueDate: new Date("2026-06-18"),
  }),
]

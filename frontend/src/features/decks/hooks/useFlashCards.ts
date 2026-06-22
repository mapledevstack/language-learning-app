import { FlashCardSchema, type FlashCard } from "../schemas/FlashCardSchema"

const useFlashCards = () => {
  return { data: flashcards }
}

export default useFlashCards

const flashcards: FlashCard[] = [
  FlashCardSchema.parse({
    id: 1,
    deckId: [1],

    front: {
      expression: "猫",
    },

    back: {
      reading: "ねこ",
      meaning: "Cat",
    },

    status: "learning",
    dueDate: new Date(),
  }),

  FlashCardSchema.parse({
    id: 2,
    deckId: [1],

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
    deckId: [1],

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
    deckId: [1],

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
    deckId: [1],

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
    deckId: [1],

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

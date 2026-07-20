import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useCreateFlashCard from "@/features/decks/hooks/useCreateFlashCard"
import type { Word } from "@/features/dictionary/schemas/WordSchema"
import { useState, type SubmitEvent } from "react"

type Props = {
  word: Word
  deckId: string
  onSuccess: () => void
}

const FlashCardForm = ({ word, deckId, onSuccess }: Props) => {
  const { mutate: createFlashCard, isPending } = useCreateFlashCard()

  const [front, setFront] = useState(word.forms[0].text)
  const [source, setSource] = useState("dictionary")
  const [userNotes, setUserNotes] = useState("")

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    createFlashCard(
      {
        wordId: word.wordId,
        deckId,
        front: {
          text: front,
        },
        source,
        userNotes,
      },
      {
        onSuccess,
      },
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={front}
        onChange={(e) => setFront(e.target.value)}
        placeholder="Front"
      />

      <Input
        value={source}
        onChange={(e) => setSource(e.target.value)}
        placeholder="Source"
      />

      <Input
        value={userNotes}
        onChange={(e) => setUserNotes(e.target.value)}
        placeholder="Notes (optional)"
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating..." : "Create Flashcard"}
      </Button>
    </form>
  )
}

export default FlashCardForm

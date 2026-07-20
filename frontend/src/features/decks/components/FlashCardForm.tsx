import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useCreateFlashCard from "@/features/decks/hooks/useCreateFlashCard"
import { useState, type SubmitEvent } from "react"
import useUpdateFlashCard from "../hooks/useUpdateFlashCard"
import type { FlashCard } from "../schemas/FlashCardSchema"

type Props = {
  wordId: string
  cardFront: string
  deckId: string
  flashCard?: FlashCard | null
  onSuccess: () => void
  mode: "create" | "edit"
}

const FlashCardForm = ({
  wordId,
  cardFront,
  deckId,
  flashCard,
  onSuccess,
  mode,
}: Props) => {
  const { mutate: createFlashCard, isPending: isCreating } =
    useCreateFlashCard()
  const { mutate: updateFlashCard, isPending: isUpdating } =
    useUpdateFlashCard()

  const [front, setFront] = useState(cardFront)
  const [source, setSource] = useState(flashCard?.source ?? "dictionary")
  const [userNotes, setUserNotes] = useState(flashCard?.userNotes ?? "")

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (mode === "create") {
      createFlashCard(
        {
          wordId: wordId,
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
    } else if (mode === "edit") {
      if (!flashCard) {
        throw new Error("flashCard is required in edit mode")
      }

      updateFlashCard(
        {
          flashCardId: flashCard._id,
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

      <Button
        type="submit"
        className="w-full"
        disabled={isCreating || isUpdating}
      >
        {isCreating || isUpdating
          ? mode === "create"
            ? "Creating..."
            : "Updating..."
          : mode === "create"
            ? "Create"
            : "Update"}
      </Button>
    </form>
  )
}

export default FlashCardForm

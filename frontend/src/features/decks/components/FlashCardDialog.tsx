import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import FlashCardForm from "./FlashCardForm"
import type { FlashCard } from "../schemas/FlashCardSchema"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  wordId: string
  flashCard?: FlashCard | null
  cardFront: string
  deckId: string
  mode: "create" | "edit"
}

const FlashCardDialog = ({
  open,
  onOpenChange,
  wordId,
  flashCard,
  cardFront,
  deckId,
  mode,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Flashcard" : "Edit Flashcard"}
          </DialogTitle>
          <DialogDescription>
            Review and customize your flashcard before saving it.
          </DialogDescription>
        </DialogHeader>

        <FlashCardForm
          wordId={wordId}
          cardFront={cardFront}
          deckId={deckId}
          flashCard={flashCard}
          onSuccess={() => onOpenChange(false)}
          mode={mode}
        />
      </DialogContent>
    </Dialog>
  )
}

export default FlashCardDialog

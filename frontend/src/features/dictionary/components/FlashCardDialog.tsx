import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Word } from "@/features/dictionary/schemas/WordSchema"
import FlashCardForm from "./FlashCardForm"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  word: Word
  deckId: string
}

const FlashCardDialog = ({ open, onOpenChange, word, deckId }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Flashcard</DialogTitle>
          <DialogDescription>
            Review and customize your flashcard before saving it.
          </DialogDescription>
        </DialogHeader>

        <FlashCardForm
          word={word}
          deckId={deckId}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

export default FlashCardDialog

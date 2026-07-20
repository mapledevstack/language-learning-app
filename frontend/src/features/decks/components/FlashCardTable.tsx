import { Button } from "@/components/ui/button"
import type { FlashCard, FlashCards } from "../schemas/FlashCardSchema"
import { Trash2, Pencil } from "lucide-react"
import FlashCardDialog from "./FlashCardDialog"
import { useState } from "react"
import { Route } from "@/routes/_app/decks/$deckId/edit"
import useDeleteFlashCard from "../hooks/useDeleteFlashCard"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Props = {
  flashCards: FlashCards
}

const FlashCardTable = ({ flashCards }: Props) => {
  const [open, setOpen] = useState(false)
  const [selectedFlashCard, setSelectedFlashCard] = useState<FlashCard | null>(
    null,
  )

  const { deckId } = Route.useParams()

  const { mutate: deleteFlashCard } = useDeleteFlashCard()

  return (
    <>
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/50 sticky top-0 text-sidebar-primary">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Front</th>
            <th className="px-4 py-3 text-left font-medium">Source</th>
            <th className="px-4 py-3 text-left font-medium">Due Date</th>
            <th className="px-4 py-3 text-left font-medium">Created</th>
            <th className="w-16 px-4 py-3 text-center font-medium">Edit</th>
            <th className="w-16 px-4 py-3 text-center font-medium">Delete</th>
          </tr>
        </thead>
        <tbody>
          {flashCards.map((flashCard) => (
            <tr
              key={flashCard._id}
              className="border-b last:border-b-0 hover:bg-muted/50"
            >
              <td className="px-4 py-3">{flashCard.front.text}</td>
              <td className="px-4 py-3 capitalize">{flashCard.source}</td>
              <td className="px-4 py-3">
                {new Date(flashCard.fsrs.due).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                {new Date(flashCard.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-primary"
                  onClick={() => {
                    setSelectedFlashCard(flashCard)
                    setOpen(true)
                  }}
                >
                  <Pencil className="size-4" />
                </Button>
              </td>
              <td className="px-4 py-3 text-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete flashcard?</AlertDialogTitle>

                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <AlertDialogAction
                        onClick={() =>
                          deleteFlashCard({
                            flashCardId: flashCard._id,
                            deckId: flashCard.deckId,
                          })
                        }
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <FlashCardDialog
        open={open}
        onOpenChange={setOpen}
        wordId={selectedFlashCard?.wordId ?? ""}
        cardFront={selectedFlashCard?.front.text ?? ""}
        flashCard={selectedFlashCard ?? undefined}
        deckId={deckId}
        mode="edit"
      />
    </>
  )
}

export default FlashCardTable

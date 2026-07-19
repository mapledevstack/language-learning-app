import type { Deck } from "@/features/decks/schemas/DeckSchema"
import { LucideEdit, LucideTrash2 } from "lucide-react"
import { Link } from "@tanstack/react-router"
import StudyCard from "@/components/cards/StudyCard"
import ProgressPlay from "./ProgressPlay"
import CircleBadge from "@/components/ui/circle-badge"
import useDeleteDeck from "../hooks/useDeleteDeck"
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
  deck: Deck
}

const DeckCard = ({ deck }: Props) => {
  const { mutate: deleteDeck, isPending } = useDeleteDeck()

  return (
    <StudyCard className="group bg-sidebar-primary/20 hover:scale-105 transition-all relative hover:bg-sidebar-primary/40">
      <div className="w-full flex justify-between">
        <Link to="/decks/$deckId/edit" params={{ deckId: String(deck.id) }}>
          <CircleBadge label={`Edit ${deck.title}`} hover={true}>
            <LucideEdit className="size-6" />
          </CircleBadge>
        </Link>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <CircleBadge label={`Delete ${deck.title}`} hover>
              <LucideTrash2 className="size-6" />
            </CircleBadge>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete deck?</AlertDialogTitle>

              <AlertDialogDescription>
                This will permanently delete <strong>{deck.title}</strong>.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

              <AlertDialogAction
                onClick={() => {
                  deleteDeck(deck.id)
                }}
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <ProgressPlay deck={deck} />

      <h1 className="text-4xl text-primary shadow-sm group-hover:text-primary-foreground transition-colors">
        {deck.title}
      </h1>
    </StudyCard>
  )
}
export default DeckCard

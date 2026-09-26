import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Route } from "@/routes/_app/decks/$deckId/edit"
import useDeck from "../hooks/useDeck"
import { useState } from "react"
import useUpdateDeck from "../hooks/useUpdateDeck"
import { useNavigate } from "@tanstack/react-router"

const DeckContentsFields = () => {
  const { deckId } = Route.useParams()
  const { data: deck } = useDeck(deckId)

  if (!deck) return null

  return <DeckForm deck={deck} deckId={deckId} />
}

type DeckFormProps = {
  deck: {
    title: string
    description: string
  }
  deckId: string
}

const DeckForm = ({ deck, deckId }: DeckFormProps) => {
  const [title, setTitle] = useState(deck.title)
  const [description, setDescription] = useState(deck.description)
  const [updateStatus, setUpdateStatus] = useState<"success" | "error" | null>(
    null,
  )

  const navigate = useNavigate()

  const { mutate: updateDeck, isPending } = useUpdateDeck()

  const handleSave = () => {
    updateDeck(
      {
        deckId,
        input: {
          title,
          description,
        },
      },
      {
        onSuccess: () => {
          setUpdateStatus("success")
        },
        onError: () => {
          setUpdateStatus("error")
        },
      },
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Deck title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe this deck..."
          className="min-h-32 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {updateStatus === "error" && (
        <p className="text-sm text-destructive">Failed to update deck</p>
      )}

      {updateStatus === "success" && (
        <p className="text-sm text-green-500">Saved!</p>
      )}

      <div className="mt-auto flex justify-end gap-2 w-full">
        <Button
          variant="outline"
          onClick={() => navigate({ to: "/decks" })}
          className="flex-1"
        >
          Cancel
        </Button>

        <Button
          type="button"
          disabled={isPending}
          onClick={handleSave}
          className="flex-1"
        >
          {isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  )
}

export default DeckContentsFields

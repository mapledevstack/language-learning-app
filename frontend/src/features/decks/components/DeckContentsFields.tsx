import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Route } from "@/routes/_app/decks/$deckId/edit"
import useDeck from "../hooks/useDeck"
import { useEffect, useState } from "react"
import useUpdateDeck from "../hooks/useUpdateDeck"
import { useNavigate } from "@tanstack/react-router"

const DeckContentsFields = () => {
  const { deckId } = Route.useParams()
  const { data: deck } = useDeck(deckId)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    if (deck) {
      setTitle(deck.title)
      setDescription(deck.description)
    }
  }, [deck])

  const [updateStatus, setUpdateStatus] = useState<"success" | "error" | null>(
    null,
  )

  const { mutate: updateDeck, isPending, isError, isSuccess } = useUpdateDeck()

  const handleSave = () => {
    updateDeck({
      deckId,
      input: {
        title,
        description,
      },
    })
  }

  useEffect(() => {
    if (isSuccess) {
      setUpdateStatus("success")
    } else if (isError) {
      setUpdateStatus("error")
    }
  }, [isSuccess, isError])

  useEffect(() => {
    if (!updateStatus) return

    const timer = setTimeout(() => {
      setUpdateStatus(null)
    }, 3000)

    return () => clearTimeout(timer)
  }, [updateStatus])

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

      <div className="mt-auto flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate({ to: "/decks" })}>
          Cancel
        </Button>

        <Button type="button" disabled={isPending} onClick={handleSave}>
          {isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  )
}

export default DeckContentsFields

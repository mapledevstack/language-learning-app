import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LucidePlus } from "lucide-react"
import { useCreateDeck } from "../hooks/useCreateDeck"
import { useState, type SubmitEvent } from "react"

const CreateDialog = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [open, setOpen] = useState(false)

  const { mutate: createDeck, isPending, isError } = useCreateDeck()

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    createDeck({ title, description }, { onSuccess: () => setOpen(false) })

    setTitle("")
    setDescription("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <div className="absolute inset-2 flex items-center justify-center hover:scale-115 hover:text-primary transition-all">
            <LucidePlus className="size-18" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={(e) => handleSubmit(e)}>
          <DialogHeader>
            <DialogTitle>Add new Deck</DialogTitle>
            <DialogDescription>
              Make an empty deck here or{" "}
              <a href="">generate a deck from sources</a>
            </DialogDescription>
            <DialogDescription>
              {isError && (
                <div className="text-sm text-destructive">
                  Failed to create deck.
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title">Deck name</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="description">Deck description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateDialog

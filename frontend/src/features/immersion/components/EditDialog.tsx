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
import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { LucideEdit } from "lucide-react"

const EditDialog = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="fixed bg-primary text-2xl p-3 rounded-4xl hover:scale-105 transition-transform text-shadow-md whitespace-nowrap flex items-center justify-center gap-2 z-10 bottom-6 right-6"
          >
            Edit
            <LucideEdit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add a New Topic</DialogTitle>
            <DialogDescription>
              Videos related to this topic are automatically shown
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Topic Name</Label>
              <Input
                id="name-1"
                name="name"
                placeholder="Travel, Cooking, Movies..."
              />
            </Field>
            <Field>
              <Label htmlFor="username-1">Background Image URL</Label>
              <Input
                id="username-1"
                name="username"
                defaultValue="https://example.png"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
export default EditDialog

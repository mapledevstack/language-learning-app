import { LucidePlus } from "lucide-react"
import Card from "@/components/Card"
import { useEffect, useRef, useState } from "react"

type Props = {
  handleCreateDeck: (title: string) => void
}

const CreateDeckCard = ({ handleCreateDeck }: Props) => {
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")

  const inputRef = useRef<HTMLInputElement>(null)

  const createDeck = () => {
    if (!title.trim()) return

    setTitle("")
    setIsCreating(false)
    handleCreateDeck(title)
  }

  useEffect(() => {
    if (isCreating) {
      inputRef.current?.focus()
    }
  }, [isCreating])

  return (
    <Card className="w-(--card-width) bg-accent-muted aspect-3/4 hover:scale-105 transition-transform flex flex-col justify-between p-2 items-center text-center relative">
      {isCreating && (
        <input
          ref={inputRef}
          type="text"
          className="p-2 text-3xl w-[85%] text-primary bg-card rounded-4xl shadow-sm text-center"
          placeholder="Deck name..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createDeck()
            } else if (e.key === "Escape") {
              setIsCreating(false)
            }
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsCreating(false)
              setTitle("")
            }, 10000)
          }}
        />
      )}

      {!isCreating && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20">
          <div
            className="p-5 absolute size-20 rounded-full"
            style={{
              background: `conic-gradient(
                  white ${100}%,
                  var(--color-primary) 0%
                )`,
            }}
          ></div>

          <div className="absolute inset-1 rounded-full bg-card"></div>

          <div className="absolute inset-2 flex items-center justify-center hover:scale-115 hover:text-primary transition-all">
            <LucidePlus
              className="size-18"
              onClick={() => setIsCreating(true)}
            />
          </div>
        </div>
      )}

      {isCreating && (
        <button
          className="bg-primary text-2xl p-3 rounded-4xl hover:scale-105 transition-transform text-shadow-md"
          onClick={() => createDeck()}
        >
          Create!
        </button>
      )}
    </Card>
  )
}
export default CreateDeckCard

import { LucidePlusCircle } from "lucide-react"
import Card from "./Card"
import { useEffect, useRef, useState } from "react"

type Props = {
  handleCreateDeck: (title : string) => void
}

const CreateDeckCard = ({ handleCreateDeck } : Props) => {
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")

  const inputRef = useRef<HTMLInputElement>(null)

  const createDeck = () => {
    if(!(title.trim())) return

    setTitle("")
    setIsCreating(false)
    handleCreateDeck(title)
  }

  useEffect(() => {
    if(isCreating) {
      inputRef.current?.focus()
    }
  
  }, [isCreating])

  return (
    <Card className="w-xs bg-accent-muted aspect-3/4 hover:scale-105 transition-transform flex flex-col justify-between p-2 items-center text-center relative">
    
        {isCreating &&
          <input
            ref={inputRef}
            type="text"
            className="bg-background p-3 text-3xl text-primary w-full border-3 rounded-4xl shadow-sm text-center"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if(e.key === "Enter") {
                createDeck()
              }
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsCreating(false)
                setTitle("")
              }, 4000)
            }}
          />}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {!isCreating && <LucidePlusCircle className="size-20 hover:scale-105 transition-transform" 
              onClick={() => setIsCreating(true)}
            />}
        </div>

        {isCreating && <button className="bg-primary text-2xl p-3 rounded-4xl hover:scale-105 transition-transform text-shadow-md" onClick={() => createDeck()}>Create!</button>}
      </Card>
    )
}
export default CreateDeckCard

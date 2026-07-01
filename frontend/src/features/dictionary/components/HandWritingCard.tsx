import Card from "@/components/cards/Card"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/cn"
import { LucideSearch, LucideTrash2, LucideUndo } from "lucide-react"
import { useCallback, useEffect, useRef } from "react"
import useDictionaryContext from "../hooks/useDictionaryContext"

const CANVAS_ID = "kanji-canvas"

type Props = {
  isWriting: boolean
}

const HandWritingCard = ({ isWriting }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { setTokens } = useDictionaryContext()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    window.KanjiCanvas.init(CANVAS_ID)
  }, [isWriting])

  return (
    <Card
      className={cn(
        "aspect-square relative flex flex-col",
        isWriting ? "mb-4" : "opacity-0 h-0 p-0 mb-0",
      )}
    >
      <h1 className="text-primary text-center font-extrabold text-2xl tracking-widest">
        Handwriting
      </h1>

      <div className="relative w-full h-full mt-4 mb-4">
        <LucideTrash2
          className="absolute top-5 right-5 z-10 text-primary cursor-pointer"
          onClick={() => window.KanjiCanvas.erase(CANVAS_ID)}
        />

        <canvas
          ref={canvasRef}
          id={CANVAS_ID}
          className="rounded-4xl border bg-background w-full h-full"
        />
      </div>

      <div className="mt-auto flex justify-center gap-2">
        <Button onClick={() => window.KanjiCanvas.deleteLast(CANVAS_ID)}>
          <LucideUndo />
          Undo
        </Button>

        <Button
          onClick={() => {
            const result = window.KanjiCanvas.recognize(CANVAS_ID)
            setTokens(result.split("").filter((token) => token.trim()))
          }}
        >
          <LucideSearch />
          Recognize
        </Button>
      </div>
    </Card>
  )
}

export default HandWritingCard

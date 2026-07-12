import { useEffect } from "react"
import type { Sentence } from "../schemas/SentenceSchema"
import getSearchTokens from "../utils/getSearchTokens"
import EmptyCard from "@/components/cards/EmptyCard"

type Props = {
  sentences: Sentence[]
  onTokenSelect?: (tokens: string[]) => void
}

const ExampleSentences = ({ sentences, onTokenSelect }: Props) => {
  useEffect(() => {
    const handleSelection = () => {
      const text = window.getSelection()?.toString().trim()

      if (!text) {
        return
      }

      const tokens = getSearchTokens(text)
      console.log("Selected text:", text)
      console.log("Extracted tokens:", tokens)
      onTokenSelect?.(tokens)
    }

    document.addEventListener("selectionchange", handleSelection)
    return () =>
      document.removeEventListener("selectionchange", handleSelection)
  }, [])

  return (
    <div className="bg-accent w-full p-4 rounded-md space-y-4">
      <h3 className="font-bold text-center tracking-widest text-sidebar-primary">
        Example Sentences
      </h3>

      {sentences.length > 0 ? (
        <ol className="space-y-3">
          {sentences.map((sentence, index) => (
            <li key={index} className="space-y-2">
              <p className="font-bold text-xl leading-relaxed">
                {index + 1}. {sentence.japanese}
              </p>

              {sentence.english && (
                <p className="text-xl italic">{sentence.english}</p>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <EmptyCard text="Sentences not available" className="bg-accent" />
      )}
    </div>
  )
}

export default ExampleSentences

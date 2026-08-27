import type { FlashCard } from "@/features/decks/schemas/FlashCardSchema"

import useWordById from "@/features/dictionary/hooks/useWordById"

import StudyFlashCardBackSkeleton from "../skeletons/StudyFlashCardBackSkeleton"

type FuriganaProps = {
  form: {
    text: string
    furigana: {
      text: string
      reading: string | null
    }[]
  }
}

const Furigana = ({ form }: FuriganaProps) => {
  if (!form.furigana.length) {
    return <div className="text-3xl font-bold">{form.text}</div>
  }

  return (
    <div className="flex items-end gap-0 text-3xl font-bold">
      {form.furigana.map((part, index) => (
        <span
          key={index}
          className="relative inline-flex flex-col items-center"
        >
          {part.reading && (
            <span className="mb-1.5 text-sm font-normal leading-none">
              {part.reading}
            </span>
          )}

          <span>{part.text}</span>
        </span>
      ))}
    </div>
  )
}
type Props = {
  card: FlashCard
}

const StudyFlashCardBack = ({ card }: Props) => {
  const { data: word, isLoading, isError } = useWordById(card.wordId)

  if (isLoading) {
    return <StudyFlashCardBackSkeleton />
  }

  if (isError || !word?.forms.length) {
    return (
      <div className="size-full grid place-items-center p-8 text-center">
        <p className="text-muted-foreground">Failed to load word.</p>
      </div>
    )
  }

  const form = word.forms[0]

  return (
    <div className="size-full flex flex-col items-center justify-center gap-4 p-6 text-center">
      <Furigana form={form} />

      <div className="space-y-0.5">
        {word.meanings.flatMap((meaning) =>
          meaning.definitions.map((definition) => (
            <p key={definition} className="text-base text-muted-foreground">
              {definition}
            </p>
          )),
        )}
      </div>

      {card.userNotes && (
        <div className="mt-4 max-w-md rounded-lg border p-3 text-sm">
          <p className="mb-1 font-medium">Notes</p>
          <p className="text-muted-foreground">{card.userNotes}</p>
        </div>
      )}
    </div>
  )
}

export default StudyFlashCardBack

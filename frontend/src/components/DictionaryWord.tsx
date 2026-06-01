import type { Word } from "@/schemas/WordSchema"

type Props = {
  word: Word
}

const DictionaryWord = ({ word } : Props) => {
  return (
    <div className="bg-card flex flex-col gap-3 items-center rounded-xl p-6">
      <h2 className="rounded-full shadow-md bg-primary/80 text-primary-foreground flex items-center justify-center p-2">{word.jlpt}</h2>
      <h1 className="text-4xl text-primary">{word.spellings}</h1>
      <h2>{word.readings}</h2>
      <h2>{word.meanings}</h2>
    </div>
  )
}
export default DictionaryWord

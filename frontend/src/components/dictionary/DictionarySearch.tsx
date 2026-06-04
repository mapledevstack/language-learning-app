import clsx from "clsx"
import { LucideLineSquiggle, Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import type { Word } from "@/schemas/WordSchema"
import type { ChangeEvent } from "react"

type Props = {
  results: Word[],
  isWriting: boolean,
  setIsWriting: (isWriting: boolean) => void,
  query: string,
  setQuery: (query: string) => void
}

// results

const DictionarySearch = ({ isWriting, setIsWriting, query, setQuery, results }: Props) => {

  return (
    <div className="flex gap-4">
      <button className={clsx("border p-3 rounded-full size-14 flex justify-center items-center hover:scale-105 transition-all whitespace-nowrap text-xl", isWriting ? "bg-primary text-card-foreground" : "bg-card text-primary")} onClick={() => setIsWriting(!isWriting)} >
          <LucideLineSquiggle />
        </button>
        <InputGroup className="size-14 w-full max-w-5xl">
          <InputGroupInput placeholder="Search for a Word, Kanji, or Sentence..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <InputGroupAddon>
            <Search className="text-primary" />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end"><p className="text-primary">{results.length}</p> results</InputGroupAddon>
        </InputGroup>
    </div>
  )
}
export default DictionarySearch

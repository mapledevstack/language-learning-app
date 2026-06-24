import { LucideLineSquiggle, Search } from "lucide-react"
import type { Word } from "@/features/dictionary/schemas/WordSchema"
import { cn } from "@/utils/cn"
import { useState, type ChangeEvent, type KeyboardEvent } from "react"
import { isRomaji, toKana, tokenize } from "wanakana"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

type Props = {
  results: Word[]
  isWriting: boolean
  setIsWriting: (isWriting: boolean) => void
  query: string
  setQuery: (query: string) => void
  setSearch: (search: string) => void
  tokens: string[]
  setTokens: (tokens: string[]) => void
}

// results

const DictionarySearch = ({
  isWriting,
  setIsWriting,
  query,
  setQuery,
  results,
  setSearch,
  tokens,
  setTokens,
}: Props) => {
  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return
  }

  const handleQueryChange = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const value = e.target.value

    setQuery(value)

    const kanaTokens = tokenize(value).map((token) => {
      if (typeof token === "string") {
        return isRomaji(token) ? toKana(token) : token
      }
      return ""
    })

    setTokens(kanaTokens.filter((token) => token.trim()))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <button
          className={cn(
            "border p-3 rounded-full size-14 flex justify-center items-center hover:scale-105 transition-all whitespace-nowrap text-xl",
            isWriting
              ? "bg-primary text-card-foreground"
              : "bg-card text-primary",
          )}
          onClick={() => setIsWriting(!isWriting)}
        >
          <LucideLineSquiggle />
        </button>

        <InputGroup className="size-14 w-full">
          <InputGroupInput
            placeholder="Search for a Word, Kanji, or Sentence..."
            value={query}
            onChange={(e) => handleQueryChange(e)}
            onKeyUp={(e) => handleSearch(e)}
          />
          <InputGroupAddon>
            <Search className="text-primary" />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <p className="text-primary">{results.length}</p> results
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div
        className={cn(
          "bg-card text-card-foreground rounded-xl border h-13 flex items-center gap-2 overflow-x-auto pl-2 pr-2 overflow-y-hidden justify-stretch transition-transform",
          !tokens.length && "h-0 border-0",
        )}
      >
        {tokens.map((token, index) => {
          return (
            <div
              className="bg-secondary text-secondary-foreground text-xl border p-1  rounded-md flex-1 text-center hover:bg-sidebar-primary hover:text-sidebar-primary-foreground transition-colors whitespace-nowrap"
              key={index}
              onClick={() => setSearch(token)}
            >
              {token}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default DictionarySearch

import { LucideLineSquiggle, LucideSearch, Search } from "lucide-react"
import { cn } from "@/utils/cn"
import { useState, type KeyboardEvent } from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import getSearchTokens from "../utils/getSearchTokens"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
  resultsCount: number
  isWriting: boolean
  setIsWriting: (isWriting: boolean) => void
  setSearch: (search: string) => void
  searchMode: "word" | "meaning"
  setSearchMode: (mode: "word" | "meaning") => void
  tokens: string[]
  setTokens: (tokens: string[]) => void
}

const DictionarySearch = ({
  isWriting,
  setIsWriting,
  resultsCount,
  setSearch,
  tokens,
  setTokens,
  searchMode,
  setSearchMode,
}: Props) => {
  const [query, setQuery] = useState("")

  const toggleSearchMode = () => {
    setSearchMode(searchMode === "word" ? "meaning" : "word")
  }

  const performSearch = () => {
    const value = query.trim()
    if (!value) return

    setSearch(value)
  }

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return

    performSearch()
  }

  const handleQueryChange = (value: string) => {
    setQuery(value)
    setTokens(getSearchTokens(value))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <button
          className={cn(
            "border p-3 rounded-full size-14 flex justify-center items-center hover:scale-105 transition-all whitespace-nowrap text-xl",
            isWriting
              ? "bg-primary text-card-foreground border-4"
              : "bg-card text-primary border-primary border-4",
          )}
          onClick={() => setIsWriting(!isWriting)}
        >
          <LucideLineSquiggle />
        </button>

        <InputGroup className="size-14 w-full">
          <InputGroupInput
            placeholder={
              searchMode === "word"
                ? "Search Words or Sentences in Japanese or Romaji"
                : "Search Meaning in English..."
            }
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={(e) => handleSearch(e)}
          />
          <InputGroupAddon>
            <Search className="text-primary" />
          </InputGroupAddon>
          <InputGroupAddon>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  type="button"
                  onClick={toggleSearchMode}
                  className="text-primary-foreground hover:text-primary-foreground/70 pl-4 pr-4"
                >
                  {searchMode === "meaning" ? "A → あ" : "あ → あ"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {searchMode === "meaning"
                  ? "Search by word"
                  : "Search by meaning"}
              </TooltipContent>
            </Tooltip>
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <p className="text-primary">{resultsCount}</p> results
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Button className="pl-6 pr-6" onClick={performSearch}>
              <LucideSearch className="text-4xl" />
            </Button>
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
              onClick={() => {
                setSearchMode("word")
                setSearch(token)
              }}
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

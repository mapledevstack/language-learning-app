import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { LucideSearch, Search } from "lucide-react"
import { Suspense, useEffect, useState } from "react"
import EmptyCard from "@/components/cards/EmptyCard"
import GrammarResultsList from "../components/GrammarResultsList"
import { cn } from "@/utils/cn"
import GrammarResultsListSkeleton from "../skeletons/GrammarResultsListSkeleton"
import { useQueryClient } from "@tanstack/react-query"
import { getGrammarResources } from "../api/grammarApi"

const GrammarPage = () => {
  const [query, setQuery] = useState("")
  const [search, setSearch] = useState("")

  const [resultsCount, setResultsCount] = useState(0)

  // Prefetch
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["grammar", "random"],
      queryFn: () => getGrammarResources("random"),
    })
  }, [queryClient])

  return (
    <div className="h-screen min-h-0 overflow-hidden flex flex-col gap-6 p-10">
      <InputGroup className="size-14 w-full">
        <InputGroupInput
          placeholder="Search for any grammar point or use a sentence to find related grammar points"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setSearch(query.trim())}
        />
        <InputGroupAddon>
          <Search className="text-primary" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <p
            className={cn(
              "text-primary",
              resultsCount > 0 ? "animate-pulse" : "hidden",
            )}
          >
            {resultsCount}
          </p>{" "}
          results
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Button className="pl-6 pr-6" onClick={() => setSearch(query.trim())}>
            <LucideSearch className="text-4xl" />
          </Button>
        </InputGroupAddon>
      </InputGroup>

      <div className="min-h-0 flex-1 flex flex-col gap-4">
        {search ? (
          <Suspense fallback={<GrammarResultsListSkeleton />}>
            <GrammarResultsList
              search={search}
              setResultsCount={setResultsCount}
            />
          </Suspense>
        ) : (
          <EmptyCard text="Search for any grammar point" icon={LucideSearch} />
        )}
      </div>
    </div>
  )
}
export default GrammarPage

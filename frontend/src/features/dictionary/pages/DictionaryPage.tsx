import { useState } from "react"
import DictionaryDetails from "../components/DictionaryDetails"
import DictionaryResults from "../components/DictionaryResults"
import DictionarySearch from "../components/DictionarySearch"
import type { Word } from "@/features/dictionary/schemas/WordSchema"
import useWordSearch from "../hooks/useWordSearch"
import { DictionaryContext } from "../hooks/useDictionaryContext"
import DictionaryResultsSkeleton from "../skeletons/DictionaryResultsSkeleton"

const DictionaryPage = () => {
  const [search, setSearch] = useState("")
  const [searchMode, setSearchMode] = useState<"word" | "meaning">("word")
  const [isWriting, setIsWriting] = useState(false)
  const [word, setWord] = useState<Word | null>(null)
  const [tokens, setTokens] = useState<string[]>([])

  const { data: results = [], isLoading } = useWordSearch(search, searchMode)

  return (
    <div className="h-full flex flex-col p-10 gap-6">
      <section>
        <DictionarySearch
          resultsCount={results.length}
          searchMode={searchMode}
          setSearchMode={setSearchMode}
          isWriting={isWriting}
          setIsWriting={setIsWriting}
          setSearch={setSearch}
          tokens={tokens}
          setTokens={setTokens}
        />
      </section>

      <section className="flex-1 md:min-h-0 grid md:grid-cols-[3fr_7fr] gap-4 items-start">
        <DictionaryContext.Provider value={{ setTokens }}>
          <DictionaryDetails isWriting={isWriting} word={word} />
        </DictionaryContext.Provider>

        {isLoading ? (
          <DictionaryResultsSkeleton />
        ) : (
          <DictionaryResults
            setWord={setWord}
            currentWord={word}
            results={results}
          />
        )}
      </section>
    </div>
  )
}

export default DictionaryPage

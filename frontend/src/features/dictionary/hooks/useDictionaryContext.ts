import { createContext, useContext } from "react"

type DictionaryContextValue = {
  setTokens: (tokens: string[]) => void
}

export const DictionaryContext = createContext<DictionaryContextValue | null>(
  null,
)

const useDictionaryContext = () => {
  const context = useContext(DictionaryContext)

  if (!context) {
    throw new Error(
      "useDictionaryContext must be used within a DictionaryProvider",
    )
  }

  return context
}

export default useDictionaryContext

import { useEffect } from "react"
import useGrammarResources from "../hooks/useGrammarResources"
import GrammarResource from "./GrammarResource"

type Props = {
  search: string
  setResultsCount: (count: number) => void
}
const GrammarResultsList = ({ search, setResultsCount }: Props) => {
  const { data: grammarResources = [] } = useGrammarResources(search)

  useEffect(() => {
    setResultsCount(grammarResources.length)
  }, [grammarResources, setResultsCount])

  return (
    <div className="h-full min-h-0 flex flex-col gap-4 overflow-y-auto">
      {grammarResources.map((resource) => (
        <GrammarResource key={resource._id} GrammarResource={resource} />
      ))}
    </div>
  )
}
export default GrammarResultsList

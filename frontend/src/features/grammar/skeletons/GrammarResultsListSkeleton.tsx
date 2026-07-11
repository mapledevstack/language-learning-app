import GrammarResourceSkeleton from "./GrammarResourceSkeleton"

const GrammarResultsListSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <GrammarResourceSkeleton key={i} />
      ))}
    </div>
  )
}

export default GrammarResultsListSkeleton

import Card from "@/components/cards/Card"
import ResultCardSkeleton from "./ResultCardSkeleton"

const DictionaryResultsSkeleton = () => {
  return (
    <Card className="h-full flex flex-wrap justify-center gap-5 overflow-y-auto overflow-x-hidden content-start">
      {Array.from({ length: 12 }).map((_, i) => (
        <ResultCardSkeleton key={i} />
      ))}
    </Card>
  )
}

export default DictionaryResultsSkeleton

import Card from "@/components/cards/Card"

const ResultCardSkeleton = () => {
  return (
    <div className="flex h-fit">
      <Card className="flex flex-col gap-3 w-86 animate-pulse">
        <div className="h-8 w-full rounded bg-muted-foreground/20" />

        <div className="h-4 w-full rounded bg-muted-foreground/20" />
        <div className="h-4 w-full rounded bg-muted-foreground/20" />
        <div className="h-4 w-full rounded bg-muted-foreground/20" />
      </Card>
    </div>
  )
}

export default ResultCardSkeleton

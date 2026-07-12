import Card from "@/components/cards/Card"

const ExampleSentencesSkeleton = () => {
  return (
    <Card className="bg-accent w-full p-4 rounded-md space-y-4 animate-pulse">
      <h3 className="font-bold text-center tracking-widest text-sidebar-primary">
        Example Sentences
      </h3>

      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-7 w-full rounded bg-muted-foreground/20" />

            <div className="space-y-2">
              <div className="h-5 w-full rounded bg-muted-foreground/20" />
              <div className="h-5 w-full rounded bg-muted-foreground/20" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default ExampleSentencesSkeleton

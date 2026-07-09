import { Check, Flame, Plus, RotateCcw, Search, TrendingUp } from "lucide-react"

const heatmap = [
  0, 1, 2, 1, 3, 2, 0, 1, 3, 2, 1, 0, 2, 3, 1, 2, 3, 2, 1, 0, 1, 3, 2, 3, 1, 2,
  0, 1, 2, 3, 1, 0, 2, 1, 3, 2, 1, 3, 2, 0, 1, 2,
]

const heatColors = [
  "bg-primary/10",
  "bg-primary/30",
  "bg-primary/55",
  "bg-primary",
]

const SideAnimation = () => {
  return (
    <div className="glass w-full overflow-hidden rounded-2xl border border-border/70 shadow-2xl shadow-primary/5">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-border/60 bg-secondary/40 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-destructive/60" />
          <span className="h-3 w-3 rounded-full bg-chart-1/70" />
          <span className="h-3 w-3 rounded-full bg-chart-2/60" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-md bg-background/60 px-3 py-1 text-xs text-muted-foreground">
          <Search className="h-3 w-3" />
          Study Dashboard
        </div>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2">
        {/* Streak */}
        <div className="rounded-xl border border-border/60 bg-card/80 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Current Streak
            </span>
            <Flame className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-semibold tracking-tight">128</span>
            <span className="text-sm text-muted-foreground">days</span>
          </div>
        </div>

        {/* Today's reviews */}
        <div className="rounded-xl border border-border/60 bg-card/80 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Today&apos;s Reviews
            </span>
            <RotateCcw className="h-4 w-4 text-chart-2" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-semibold tracking-tight">42</span>
            <span className="text-sm text-muted-foreground">/ 60 done</span>
          </div>
          <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[70%] rounded-full bg-primary" />
          </div>
        </div>

        {/* Dictionary lookup */}
        <div className="rounded-xl border border-border/60 bg-card/80 p-4 sm:col-span-2">
          <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm text-muted-foreground">
            <Search className="h-3.5 w-3.5" />
            食べる
          </div>
          <div className="mt-3 flex items-start justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-jp text-2xl font-medium">食べる</span>
                <span className="text-sm text-muted-foreground">たべる</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                to eat · Ichidan verb, transitive
              </p>
            </div>
            <button className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground">
              <Plus className="h-3 w-3" />
              Add to deck
            </button>
          </div>
        </div>

        {/* Flashcard preview */}
        <div className="rounded-xl border border-border/60 bg-card/80 p-4">
          <span className="text-xs font-medium text-muted-foreground">
            Flashcard
          </span>
          <div className="mt-2 rounded-lg border border-dashed border-border bg-background/50 py-4 text-center">
            <span className="font-jp text-2xl font-medium">猫</span>
            <p className="mt-1 text-xs text-muted-foreground">ねこ — cat</p>
          </div>
          <div className="mt-2.5 flex gap-1.5">
            <button className="flex-1 rounded-md bg-destructive/10 py-1 text-[11px] font-medium text-destructive">
              Again
            </button>
            <button className="flex-1 rounded-md bg-chart-1/15 py-1 text-[11px] font-medium text-chart-3">
              Good
            </button>
            <button className="flex-1 rounded-md bg-primary/10 py-1 text-[11px] font-medium text-primary">
              Easy
            </button>
          </div>
        </div>

        {/* Progress heatmap */}
        <div className="rounded-xl border border-border/60 bg-card/80 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Activity
            </span>
            <span className="flex items-center gap-1 text-[11px] text-chart-2">
              <TrendingUp className="h-3 w-3" />
              +12%
            </span>
          </div>
          <div className="mt-2.5 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1">
            {heatmap.map((level, i) => (
              <span
                key={i}
                className={`aspect-square rounded-[3px] ${heatColors[level]}`}
              />
            ))}
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Check className="h-3 w-3 text-primary" />
            1,240 cards reviewed this month
          </div>
        </div>
      </div>
    </div>
  )
}
export default SideAnimation

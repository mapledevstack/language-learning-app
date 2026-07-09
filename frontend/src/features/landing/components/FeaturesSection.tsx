import {
  BookOpen,
  Brain,
  Clapperboard,
  FileText,
  ChartColumn,
  Workflow,
} from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Dictionary",
    description:
      "Look up vocabulary, kanji, grammar, example sentences, and audio pronunciation—all in one place.",
  },
  {
    icon: Brain,
    title: "Flashcards",
    description:
      "Create decks effortlessly and review with spaced repetition to remember what you learn.",
  },
  {
    icon: Clapperboard,
    title: "Immersion Learning",
    description:
      "Learn naturally from anime, dramas, YouTube, games, and other Japanese content.",
  },
  {
    icon: FileText,
    title: "Subtitle Import",
    description:
      "Import subtitle files and instantly generate vocabulary decks from the media you watch.",
  },
  {
    icon: ChartColumn,
    title: "Progress Tracking",
    description:
      "Track review history, study streaks, JLPT progress, and learning statistics over time.",
  },
  {
    icon: Workflow,
    title: "Unified Workspace",
    description:
      "Search, save, review, and track your learning without switching between multiple apps.",
  },
]

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="mx-auto max-w-4/5 px-6">
        <div className="mx-auto max-w-4/5 text-center">
          <h2 className="mt-5 text-4xl font-medium tracking-tight sm:text-5xl">
            Everything you need to learn Japanese.
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Stop juggling multiple tools. Study, review, and track your progress
            from one place.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4/5 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>

              <p className="mt-3 leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

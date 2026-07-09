import { Search, BookMarked, ChartColumn } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search",
    description:
      "Find vocabulary, kanji, grammar, and example sentences instantly with a powerful integrated dictionary.",
  },
  {
    number: "02",
    icon: BookMarked,
    title: "Learn",
    description:
      "Turn anything you discover into flashcards, organize your study material, and review efficiently with spaced repetition.",
  },
  {
    number: "03",
    icon: ChartColumn,
    title: "Track",
    description:
      "Measure your progress with statistics, streaks, and personalized insights to stay motivated every day.",
  },
]

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div className="relative mx-auto max-w-4/5 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-5 text-balance font-medium tracking-tight sm:text-5xl">
            Learn, review, and improve—all in one place.
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to study Japanese without juggling multiple
            apps.
          </p>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-border/70 bg-card p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <step.icon className="h-5 w-5" />
                </span>

                <span className="font-mono text-lg text-muted-foreground">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-medium tracking-tight">
                {step.title}
              </h3>

              <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection

import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const CtaSection = () => {
  return (
    <section id="cta" className="relative px-6 py-24 lg:py-32">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border/70 bg-card px-8 py-16 text-center shadow-2xl shadow-primary/5 lg:px-16 lg:py-24">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-chart-1/25 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />

        <div className="relative">
          <span className="font-jp text-4xl text-primary/70">日本語</span>

          <h2 className="mt-4 text-balance text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
            Start learning today.
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-pretty text-lg text-muted-foreground">
            Bring your dictionary, decks, immersion and grammar into one
            workspace. Free to start — no credit card.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="group rounded-full px-6 shadow-lg shadow-primary/20"
            >
              <Link to="/auth" search={{ mode: "signup" }}>
                Start Learning
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-6"
            >
              <Link to="/auth" search={{ mode: "login" }}>
                Log In
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaSection

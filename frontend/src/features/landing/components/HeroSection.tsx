import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import useDemoUser from "@/features/auth/hooks/useDemoUser"

const HeroSection = () => {
  const { mutate: loginDemo, isPending } = useDemoUser()

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" />
      <div className="relative mx-auto grid max-w-4/5 items-center gap-12 px-6 pb-24 pt-36 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:pb-32 lg:pt-44">
        <div className="max-w-xl">
          <h1
            className="mt-6 text-balance text-[clamp(2.75rem,7vw,5rem)] font-medium leading-[0.95] tracking-tight animate-in-up"
            style={{ animationDelay: "80ms" }}
          >
            Everything you need
            <br />
            to <span className="text-gradient">learn Japanese.</span>
          </h1>

          <p
            className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground animate-in-up"
            style={{ animationDelay: "160ms" }}
          >
            Dictionary, spaced-repetition flashcards, vocabulary mining, grammar
            lookup and progress tracking—all in one place.
          </p>

          <div
            className="mt-8 inline-flex flex-col gap-3 animate-in-up"
            style={{ animationDelay: "240ms" }}
          >
            <div className="flex gap-3">
              <Button
                asChild
                size="lg"
                className="group h-14 rounded-full px-6 shadow-lg shadow-primary/20 text-lg"
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
                className="rounded-full px-6 h-14 text-lg"
              >
                <Link to="/auth" search={{ mode: "login" }}>
                  Log In
                </Link>
              </Button>
            </div>

            <Button
              size="lg"
              variant="secondary"
              className="w-full rounded-full h-14 text-lg"
              onClick={() => loginDemo()}
              disabled={isPending}
            >
              {isPending ? "Loading Demo..." : "Try Demo Account"}
            </Button>
          </div>
        </div>

        <div
          className="relative flex h-125 items-center justify-center animate-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] blur-2xl" />

          <div className="flex h-full w-full items-center justify-center rounded-[2rem] border border-dashed border-border/60 bg-card/40">
            <span className="text-muted-foreground">Something here</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

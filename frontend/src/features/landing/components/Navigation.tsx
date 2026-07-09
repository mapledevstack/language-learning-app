import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/cn"
import seal from "@/assets/logos/seal.png"
import { SiGithub } from "react-icons/si"
import { Link } from "@tanstack/react-router"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Get Started", href: "#cta" },
]

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={cn(
          "flex w-full items-center justify-between rounded-full border border-transparent px-6 py-5 transition-all duration-300",
          scrolled && "glass border-border/60 shadow-lg shadow-black/3",
        )}
      >
        <a href="#" className="flex items-center gap-2.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-jp text-lg font-bold">
            <img src={seal} />
          </span>
          <span className="text-2xl font-heading font-bold tracking-wider">
            Learn Japanese
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-5 py-2 text-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/mapledevstack/language-learning-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full px-5 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground text-lg"
          >
            <SiGithub className="h-4 w-4" />
            GitHub
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="rounded-full text-sm">
            <Link to="/auth" search={{ mode: "login" }}>
              Log In
            </Link>
          </Button>
          <Button size="sm" className="rounded-full text-sm shadow-sm">
            <Link to="/auth" search={{ mode: "signup" }}>
              Start Learning
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default Navigation

import { Outlet } from "@tanstack/react-router"
import { useState } from "react"

import AppLayoutDesktop from "./AppLayoutDesktop"
import AppLayoutMobile from "./AppLayoutMobile"

export const navigationMenu = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Dictionary", to: "/dictionary" },
  { label: "Flashcards", to: "/decks" },
  { label: "Immersion", to: "/immersion" },
  { label: "Grammar", to: "/grammar" },
  { label: "Profile", to: "/profile" },
]

const AppLayout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <div className="h-screen min-h-0 font-san bg-primary">
      <div className="bg-primary flex flex-col h-full relative">
        <div className="hidden md:block">
          <AppLayoutDesktop isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        </div>

        <div className="md:hidden">
          <AppLayoutMobile isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        </div>

        <div
          className={`flex-1 min-h-0 bg-background text-foreground transition-all duration-300 ${
            isNavOpen ? "md:scale-[0.97]" : ""
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AppLayout

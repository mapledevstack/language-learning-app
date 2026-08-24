import { Outlet } from "@tanstack/react-router"
import { useEffect, useState } from "react"

import AppLayoutDesktop from "./AppLayoutDesktop"
import AppLayoutMobile from "./AppLayoutMobile"
import { Toaster } from "@/components/ui/sonner"
import useCurrentUser from "@/features/auth/hooks/useCurrentUser"
import { setColorTheme } from "@/utils/theme"

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
  const { data: user } = useCurrentUser()

  useEffect(() => {
    if (user?.preferences?.colorTheme) {
      setColorTheme(user.preferences.colorTheme)
    }
  }, [user?.preferences?.colorTheme])

  return (
    <div className="h-screen min-h-0 bg-primary font-san">
      <div className="relative flex h-full flex-col bg-primary">
        <div className="hidden md:block">
          <AppLayoutDesktop isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        </div>

        <div className="md:hidden">
          <AppLayoutMobile isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div
            className={`min-h-full bg-background text-foreground transition-transform duration-300 ${
              isNavOpen ? "md:scale-[0.97]" : ""
            }`}
          >
            <Toaster />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppLayout

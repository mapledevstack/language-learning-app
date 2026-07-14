import { cn } from "@/utils/cn"
import { Link } from "@tanstack/react-router"
import { LucideMenu } from "lucide-react"

import { navigationMenu } from "./AppLayout"

type Props = {
  isNavOpen: boolean
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AppLayoutDesktop = ({ isNavOpen, setIsNavOpen }: Props) => {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-screen z-50 flex flex-col items-center transition-all duration-400",
        isNavOpen ? "translate-y-0" : "-translate-y-26",
      )}
      onMouseEnter={() => setIsNavOpen(true)}
      onMouseLeave={() => setIsNavOpen(false)}
    >
      <nav className="flex h-(--navbar-height) w-full cursor-pointer bg-primary pl-(--navigation-border) text-primary-foreground">
        {navigationMenu.map((menu) => (
          <div
            key={menu.label}
            className="flex-1 h-full transition-all hover:bg-sidebar-primary"
          >
            <Link
              to={menu.to}
              onClick={() => setIsNavOpen(false)}
              className="flex h-full items-center justify-center text-xl font-bold"
            >
              {menu.label}
            </Link>
          </div>
        ))}
      </nav>

      <button
        onClick={() => setIsNavOpen((prev) => !prev)}
        className="cursor-pointer rounded-b-4xl bg-primary"
      >
        <LucideMenu className="size-8 w-34 scale-x-125 scale-y-60 text-primary-foreground" />
      </button>
    </div>
  )
}

export default AppLayoutDesktop

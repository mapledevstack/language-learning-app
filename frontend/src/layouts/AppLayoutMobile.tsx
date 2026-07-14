import { Link } from "@tanstack/react-router"
import { LucideMenu, LucideX } from "lucide-react"

import { navigationMenu } from "./AppLayout"

type Props = {
  isNavOpen: boolean
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AppLayoutMobile = ({ isNavOpen, setIsNavOpen }: Props) => {
  return (
    <>
      <button
        onClick={() => setIsNavOpen(true)}
        className="fixed top-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg"
      >
        <LucideMenu size={28} />
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isNavOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsNavOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-primary text-primary-foreground shadow-xl transition-transform duration-300 ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <h2 className="text-xl font-bold">Menu</h2>

          <button
            onClick={() => setIsNavOpen(false)}
            className="rounded-lg p-2 hover:bg-sidebar-primary transition-colors"
          >
            <LucideX size={24} />
          </button>
        </div>

        <nav className="flex flex-col">
          {navigationMenu.map((menu) => (
            <Link
              key={menu.label}
              to={menu.to}
              onClick={() => setIsNavOpen(false)}
              className="px-6 py-4 text-lg font-semibold transition-colors hover:bg-sidebar-primary"
            >
              {menu.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default AppLayoutMobile

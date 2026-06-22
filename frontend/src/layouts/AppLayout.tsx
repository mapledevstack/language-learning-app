import { cn } from "@/utils/cn"
import { Link, Outlet } from "@tanstack/react-router"
import { LucideMenu } from "lucide-react"
import { useState } from "react"

const navigationMenu = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Dictionary", to: "/dictionary" },
  { label: "Flashcards", to: "/decks" },
  { label: "Immersion", to: "/immersion" },
  { label: "Profile", to: "/profile" },
]

const AppLayout = () => {
  const [isNavOpen, setisNavOpen] = useState(false)

  return (
    <div className="h-screen font-san bg-primary">
      <div className="bg-primary flex flex-col h-full relative">
        <div
          className="fixed top-0 left-0 w-screen z-50 flex flex-col items-center not-hover:-translate-y-26 transition-all duration-400"
          onMouseEnter={() => setisNavOpen(true)}
          onMouseLeave={() => setisNavOpen(false)}
        >
          <nav className="flex h-(--navbar-height) cursor-pointer bg-primary text-primary-foreground w-full pl-(--navigation-border)">
            {navigationMenu.map((menu) => {
              return (
                <div
                  className="flex-1 hover:bg-sidebar-primary transition-all h-full"
                  key={menu.label}
                >
                  <Link
                    to={menu.to}
                    className="h-full font-bold flex items-center justify-center text-xl"
                  >
                    {menu.label}
                  </Link>
                </div>
              )
            })}
          </nav>

          <div className="bg-primary rounded-b-4xl cursor-pointer">
            <LucideMenu className="text-primary-foreground size-8 w-34 scale-x-125 scale-y-60" />
          </div>
        </div>

        <div
          className={cn(
            "flex-1 md:overflow-hidden md:min-h-0 bg-background text-foreground transition-all duration-400",
            isNavOpen && "scale-[0.97]",
          )}
        >
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AppLayout

// const AppLayout = () => {
//   return (
//     <div className="flex flex-col h-screen bg-background text-foreground font-sans">

//       <nav className='flex gap-4 min-h-(--navbar-height) cursor-pointer justify-evenly items-center bg-sidebar'>
//         <Link to='/dashboard'>Dashboard</Link>
//         <Link to='/dictionary'>Dictionary</Link>
//         <Link to="/decks">Flashcards</Link>
//         <Link to='/profile'>Profile</Link>
//       </nav>

//       <main className="flex-1 md:overflow-hidden md:min-h-0">
//         <Outlet />
//       </main>

//     </div>
//   )
// }
// export default AppLayout

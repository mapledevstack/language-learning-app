import { cn } from "@/lib/utils"
import { Link, Outlet } from "@tanstack/react-router"
import { LucideGripHorizontal } from "lucide-react"
import { useState } from "react"

const AppLayout = () => {
  const [isNavOpen, setisNavOpen] = useState(true)

  return (
    <div className="h-screen font-sans [--navigation-border:2rem] bg-primary">
      <div className="bg-primary flex flex-col h-full relative">
        
        <div className="fixed top-0 left-0 w-screen z-50 flex flex-col items-center not-hover:-translate-y-26 transition-transform" onMouseEnter={() => setisNavOpen(true)} onMouseLeave={() => setisNavOpen(false)}>
          <nav className="grid grid-cols-4 place-items-center h-(--navbar-height) cursor-pointer bg-primary text-primary-foreground w-full">
            <Link to="/dashboard" className="hover:scale-105 hover:text-xl transition-transform font-bold">Dashboard</Link>
            <Link to="/dictionary" className="hover:scale-105 hover:text-xl transition-transform font-bold">Dictionary</Link>
            <Link to="/decks" className="hover:scale-105 hover:text-xl transition-transform font-bold">Flashcards</Link>
            <Link to="/profile" className="hover:scale-105 hover:text-xl transition-transform font-bold">Profile</Link>
          </nav>
          <div className="bg-primary rounded-b-4xl cursor-pointer">
            <LucideGripHorizontal className="text-primary-foreground size-8 w-34"/>
          </div>
        </div>
        
        
        <div className={cn("flex-1 md:overflow-hidden md:min-h-0 bg-background text-foreground", isNavOpen && "scale-[0.97] transition-all")}>
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

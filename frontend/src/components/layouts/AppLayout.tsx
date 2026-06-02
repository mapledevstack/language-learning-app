import { Link, Outlet } from "@tanstack/react-router"

const AppLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-sans">
      
      <nav className='flex gap-4 h-(--navbar-height) cursor-pointer justify-evenly items-center bg-sidebar'>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/dictionary'>Dictionary</Link>
        <Link to="/flashcards">Flashcards</Link>
        <Link to='/profile'>Profile</Link>
      </nav>

      <main className="flex-1 md:overflow-hidden md:min-h-0">
        <Outlet />
      </main>
    
    </div>
  )
}
export default AppLayout

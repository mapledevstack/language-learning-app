import { Link, Outlet } from "@tanstack/react-router"

const AppLayout = () => {
  return (
    <div>
      <nav className='flex gap-4 m-4 cursor-pointer'>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/dictionary'>Dictionary</Link>
        <Link to='/profile'>Profile</Link>
      </nav>

      <Outlet />
    </div>
  )
}
export default AppLayout

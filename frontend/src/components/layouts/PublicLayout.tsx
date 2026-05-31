import { Link, Outlet } from "@tanstack/react-router"

const PublicLayout = () => {
  return (
    <div>
      <nav className='flex gap-4 m-4'>
        <Link to='/'>Landing Page</Link>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </nav>

      <Outlet />
    </div>
  )
}
export default PublicLayout

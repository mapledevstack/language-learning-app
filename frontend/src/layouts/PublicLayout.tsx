import { Link, Outlet } from "@tanstack/react-router"

const PublicLayout = () => {
  return (
    <div>
      <nav className="flex gap-4 m-4">
        <Link to="/">Landing Page</Link>
        <Link to="/auth">Login</Link>
        <Link to="/auth">Signup</Link>
      </nav>

      <Outlet />
    </div>
  )
}
export default PublicLayout

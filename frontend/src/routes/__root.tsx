import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <nav className='flex gap-4 mb-4'>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/dictionary">Dictionary</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <Outlet />
    </React.Fragment>
  )
}

import useCurrentUser from "@/features/auth/hooks/useCurrentUser"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/dashboard")({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: user } = useCurrentUser()
  return <div>Hello {user?.email}!</div>
}

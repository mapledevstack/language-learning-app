import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dictionary')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dictionary"!</div>
}

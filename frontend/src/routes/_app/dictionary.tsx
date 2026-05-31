import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dictionary')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dictionary"!</div>
}

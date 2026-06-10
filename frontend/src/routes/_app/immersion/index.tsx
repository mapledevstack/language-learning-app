import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/immersion/")({
  component: ImmersionPage,
})

function ImmersionPage() {
  return <div>Hello "/_app/immersion/"!</div>
}

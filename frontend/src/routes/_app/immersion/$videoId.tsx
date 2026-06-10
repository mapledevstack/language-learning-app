import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/immersion/$videoId")({
  component: ImmersionVideoPage,
})

function ImmersionVideoPage() {
  return <div>Hello "/_app/immersion/$videoId"!</div>
}

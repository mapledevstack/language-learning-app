import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/immersion/")({
  component: ImmersionPage,
})

function ImmersionPage() {
  return (
    <div className="h-full grid place-items-center">
      <button className="rounded-xl bg-primary size-20">
        <Link to="/immersion/$videoId" params={{ videoId: "C3oPjuudXas" }}>
          Video
        </Link>
      </button>
    </div>
  )
}

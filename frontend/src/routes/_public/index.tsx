import { Button } from "@/components/ui/button"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/_public/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-center text-4xl font-bold">
          Welcome to JP Snowfluff
        </h1>

        <div className="flex flex-col gap-4">
          <Button asChild variant="link">
            <Link
              to="/auth"
              search={{
                mode: "login",
              }}
            >
              Log in
            </Link>
          </Button>

          <Button asChild variant="link">
            <Link
              to="/auth"
              search={{
                mode: "signup",
              }}
            >
              Sign in
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

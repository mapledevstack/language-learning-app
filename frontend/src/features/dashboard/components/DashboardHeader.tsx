import { Skeleton } from "@/components/ui/skeleton"
import useCurrentUser from "@/features/auth/hooks/useCurrentUser"

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

const getDisplayName = (email: string) => email.split("@")[0]

const formatDate = () =>
  new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date())

const DashboardHeader = () => {
  const { data: user, isLoading } = useCurrentUser()

  return (
    <header className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {isLoading ? (
          <Skeleton className="h-9 w-64" />
        ) : (
          <h1 className="text-4xl font-semibold tracking-tight text-primary ita">
            {getGreeting()}
            {user ? `, ${getDisplayName(user.email)}` : ""}
          </h1>
        )}
        <p className="mt-1 text-muted-foreground">
          Here&apos;s your study overview for today.
        </p>
      </div>

      <p className="text-sm text-muted-foreground">{formatDate()}</p>
    </header>
  )
}

export default DashboardHeader

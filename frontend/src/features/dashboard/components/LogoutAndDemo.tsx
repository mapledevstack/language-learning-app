import Card from "@/components/cards/Card"
import { Button } from "@/components/ui/button"
import useDemoUser from "@/features/auth/hooks/useDemoUser"
import useLogout from "@/features/auth/hooks/useLogout"
import { LucideLogOut } from "lucide-react"

const LogoutAndDemo = () => {
  const { mutate: logout } = useLogout()
  const { mutate: loginDemo, isPending } = useDemoUser()

  return (
    <Card className="flex flex-row items-center justify-center gap-4">
      <div className="flex-1 grid place-items-center">
        <Button
          onClick={() => logout()}
          className="w-full rounded-full h-14 text-lg"
          variant="destructive"
        >
          <LucideLogOut />
          Logout
        </Button>
      </div>
      <div className="flex-1 grid place-items-center">
        <Button
          size="lg"
          variant="secondary"
          className="w-full rounded-full h-14 text-lg"
          onClick={() => loginDemo()}
          disabled={isPending}
        >
          {isPending ? "Loading Demo..." : "Try Demo Account"}
        </Button>
      </div>
    </Card>
  )
}
export default LogoutAndDemo

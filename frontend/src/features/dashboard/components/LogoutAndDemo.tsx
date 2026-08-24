import Card from "@/components/cards/Card"
import { Button } from "@/components/ui/button"
import useLogout from "@/features/auth/hooks/useLogout"
import { LucideLogOut } from "lucide-react"

const LogoutAndDemo = () => {
  const { mutate: logout } = useLogout()

  return (
    <Card className="flex flex-row items-center justify-center">
      <div className="flex-1 grid place-items-center">
        <Button onClick={() => logout} className="w-3/5" variant="destructive">
          <LucideLogOut />
          Logout
        </Button>
      </div>
      <div className="flex-1 grid place-items-center">
        <Button className="w-3/5" variant="outline">
          Use Demo Account
        </Button>
      </div>
    </Card>
  )
}
export default LogoutAndDemo

import { useNavigate } from "@tanstack/react-router"
import { LucideHome } from "lucide-react"

const BackToHome = () => {
  const navigate = useNavigate()

  return (
    <div
      className="p-3 bg-accent rounded-2xl"
      onClick={() => navigate({ to: "/" })}
    >
      <LucideHome />
    </div>
  )
}
export default BackToHome

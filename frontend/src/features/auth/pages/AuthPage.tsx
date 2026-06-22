import FlipCard from "@/components/cards/FlipCard"
import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { AUTH_MODE, Route } from "@/routes/_public/auth"

const AuthPage = () => {
  const { mode } = Route.useSearch()
  const navigate = Route.useNavigate()

  const isFlipped = mode === AUTH_MODE.SIGNUP

  return (
    <div className="h-screen flex flex-col items-center justify-center p-10 relative gap-10">
      <motion.div
        initial={{ opacity: 0, y: 50, x: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut" }}
      >
        <FlipCard
          isFlipped={isFlipped}
          front={<LoginForm />}
          back={<SignupForm />}
          cardScale={1.35}
        />
      </motion.div>

      <Button
        onClick={() =>
          navigate({
            search: { mode: isFlipped ? AUTH_MODE.LOGIN : AUTH_MODE.SIGNUP },
          })
        }
        className="absolute bottom-15"
      >
        {"Flip"}
      </Button>
    </div>
  )
}
export default AuthPage

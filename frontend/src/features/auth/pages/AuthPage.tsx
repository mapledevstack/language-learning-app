import FlipCard from "@/components/cards/FlipCard"
import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"
import { motion } from "motion/react"
import { Route } from "@/routes/_public/auth"
import { AUTH_MODE } from "../schemas/authModes"

const AuthPage = () => {
  const { mode } = Route.useSearch()
  const isFlipped = mode === AUTH_MODE.SIGNUP

  return (
    <div className="h-screen flex flex-col items-center justify-center p-10 relative gap-10">
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
          x: 0,
        }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut" }}
      >
        <FlipCard
          isFlipped={isFlipped}
          front={<LoginForm />}
          back={<SignupForm />}
          cardScale={1.5}
          className="bg-background border-none"
        />
      </motion.div>
    </div>
  )
}
export default AuthPage

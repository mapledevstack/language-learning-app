import FlipCard from "@/components/cards/FlipCard"
import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"
import { useState } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"

type Props = {}
const AuthPage = (props: Props) => {
  const [isFlipped, setIsFlipped] = useState(false)

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
        onClick={() => setIsFlipped((prev) => !prev)}
        className="absolute bottom-15"
      >
        {"Flip"}
      </Button>
    </div>
  )
}
export default AuthPage

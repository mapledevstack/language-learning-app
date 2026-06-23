import { useMutation } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { sendPasswordResetEmail } from "../api/authApi"
import { LucideCircleCheck } from "lucide-react"
import ForgotForm from "../components/ForgotForm"

const ForgotPasswordPage = () => {
  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: sendPasswordResetEmail,
  })

  return (
    <div className="h-screen flex flex-col items-center justify-center p-10 relative gap-10">
      {isSuccess || isError ? (
        <div className="flex flex-col justify-center items-center gap-6">
          <LucideCircleCheck />
          <h1 className="text-xl font-semibold text-green-500">
            Check your inbox to reset password
          </h1>
        </div>
      ) : (
        <div className="w-112.5">
          <ForgotForm isPending={isPending} mutate={mutate} />
        </div>
      )}
      <Link to="/" className="mt-4 text-sm text-muted-foreground underline">
        Go back to home
      </Link>
    </div>
  )
}
export default ForgotPasswordPage

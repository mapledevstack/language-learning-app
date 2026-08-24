import { Route } from "@/routes/_public/auth_.password.reset"
import { LucideCircleAlert, LucideCircleCheck } from "lucide-react"
import ResetForm from "@/features/auth/components/ResetForm"
import { resetPassword } from "../api/authApi"
import { useMutation } from "@tanstack/react-query"
import BackToHome from "@/layouts/BackToHome"

const ResetPasswordPage = () => {
  const { code, exp }: { code: string; exp: string } = Route.useSearch()
  const isExpired = Date.now() > Number(exp)

  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: resetPassword,
  })

  return (
    <div className="h-screen flex flex-col items-center justify-center p-10 relative gap-10">
      {isSuccess ? (
        <div className="flex flex-col justify-center items-center gap-6">
          <LucideCircleCheck />
          <h1 className="text-xl font-semibold text-green-500">
            Password successfully updated
          </h1>
        </div>
      ) : isExpired ? (
        <div className="flex flex-col justify-center items-center gap-6">
          <LucideCircleAlert />
          <h1 className="text-xl font-semibold text-red-500">
            Verification link expired
          </h1>
        </div>
      ) : (
        <div className="w-112.5">
          <ResetForm
            isPending={isPending}
            isError={isError}
            mutate={mutate}
            verificationCode={code}
          />
        </div>
      )}

      <div className="absolute top-4 left-4">
        <BackToHome />
      </div>
    </div>
  )
}
export default ResetPasswordPage

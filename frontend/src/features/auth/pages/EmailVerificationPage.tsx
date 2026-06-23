import { Route } from "@/routes/_public/auth_.email.verify.$code"
import { Spinner } from "@/components/ui/spinner"
import { LucideTriangleAlert } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { verifyEmail } from "../api/authApi"
import { useQuery } from "@tanstack/react-query"

const EmailVerificationPage = () => {
  const { code } = Route.useParams()

  const { isPending, isError } = useQuery({
    queryKey: ["emailverification", code],
    queryFn: () => verifyEmail(code),
  })

  const content = isPending ? (
    <>
      <Spinner />
      <p className="text-lg">Verifying your email...</p>
    </>
  ) : isError ? (
    <>
      <LucideTriangleAlert size={40} />
      <h1 className="text-xl font-semibold text-destructive">
        Email Verification Failed
      </h1>
      <p>The verification link is invalid or has expired.</p>
    </>
  ) : (
    <>
      <h1 className="text-xl font-semibold text-green-500">
        Email Successfully Verified
      </h1>
      <p>You can now log in to your account.</p>
    </>
  )

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex flex-col items-center gap-4 rounded-lg border p-8">
        {content}

        <Link to="/" className="mt-4 text-sm text-muted-foreground underline">
          Go back to home
        </Link>
      </div>
    </div>
  )
}
export default EmailVerificationPage

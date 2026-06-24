import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Link } from "@tanstack/react-router"
import { useState, type SubmitEvent } from "react"

type Props = {
  isPending: boolean
  isError: boolean
  mutate: any
  verificationCode: string
}

const ForgotForm = ({
  isPending,
  isError,
  mutate,
  verificationCode,
}: Props) => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutate({ verificationCode, password })
  }

  return (
    <form
      className="h-full p-6 bg-card rounded-4xl space-y-8"
      onSubmit={handleSubmit}
    >
      <FieldLegend>
        <h1 className="text-2xl font-bold">Reset password</h1>
      </FieldLegend>

      <div className="text-destructive">
        {isError && "Unable to reset password"}
      </div>

      <FieldGroup className="flex flex-col justify-evenly">
        <Field>
          <FieldLabel htmlFor="password">New Password</FieldLabel>
          <Input
            id="password"
            type="password"
            className="h-14"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FieldDescription className="text-muted-foreground">
            Must be at least 6 characters long
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            className="h-14"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Field>

        <FieldSeparator />

        <Field orientation="horizontal" className="justify-evenly">
          <Button
            type="submit"
            className="text-2xl flex-1 pt-6 pb-6"
            disabled={password.length < 6 || password !== confirmPassword}
          >
            <span className="m-2">{"Reset password"}</span>
            {isPending && <Spinner />}
          </Button>
        </Field>

        <Field>
          <Button asChild type="button" variant="link">
            <Link to="/auth" search={{ mode: "login" }}>
              Back to login
            </Link>
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default ForgotForm

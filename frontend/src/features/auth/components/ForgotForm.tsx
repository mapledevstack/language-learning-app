import { Button } from "@/components/ui/button"
import {
  Field,
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
  mutate: any
}

const ForgotForm = ({ isPending, mutate }: Props) => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate({ email })
  }

  return (
    <form
      className="h-full p-6 bg-card rounded-4xl space-y-8"
      onSubmit={handleSubmit}
    >
      <FieldLegend>
        <h1 className="text-2xl font-bold">Forgot password?</h1>
      </FieldLegend>

      <FieldGroup className="flex flex-col justify-evenly">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="h-14"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>

        <FieldSeparator />

        <Field orientation="horizontal" className="justify-evenly">
          <Button
            type="submit"
            className="text-2xl flex-1 pt-6 pb-6"
            disabled={!email}
          >
            <span>{"Send reset email"}</span>
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

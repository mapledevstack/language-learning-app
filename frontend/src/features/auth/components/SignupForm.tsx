import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Route } from "@/routes/_public/auth"
import { useState } from "react"

const SignupForm = () => {
  const navigate = Route.useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <form className="h-full p-6 bg-card rounded-4xl">
      <FieldLegend>
        <h1 className="text-2xl font-bold">Create a new account</h1>
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

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            className="h-14"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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

        <Field orientation={"horizontal"} className="justify-evenly">
          <Button
            type="reset"
            variant={"destructive"}
            className="text-2xl flex-1 pt-6 pb-6"
            onClick={() => {
              setEmail("")
              setPassword("")
            }}
          >
            Reset
          </Button>
          <Button type="submit" className="text-2xl flex-1 pt-6 pb-6">
            Submit
          </Button>
        </Field>

        <Field>
          <Button
            type="button"
            variant={"link"}
            onClick={() => {
              setEmail("")
              setPassword("")
              setConfirmPassword("")
              navigate({ search: { mode: "login" } })
            }}
          >
            Login
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default SignupForm

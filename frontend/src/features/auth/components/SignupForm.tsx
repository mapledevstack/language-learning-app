import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { AUTH_MODE, Route } from "@/routes/_public/auth"
import { useState } from "react"

const SignupForm = () => {
  const navigate = Route.useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <form className="h-full p-4">
      <FieldGroup className="h-full flex flex-col justify-evenly">
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
          <FieldLabel htmlFor="confirm-password">Password</FieldLabel>
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
            onClick={() => navigate({ search: { mode: "login" } })}
          >
            Login
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default SignupForm

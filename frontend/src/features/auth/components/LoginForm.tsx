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
import { useMutation } from "@tanstack/react-query"
import { useState, type SubmitEvent } from "react"
import { login } from "../api/authApi"
import { Spinner } from "@/components/ui/spinner"
import { Link } from "@tanstack/react-router"

const LoginForm = () => {
  const navigate = Route.useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { mutate, isPending, isError } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate({ to: "/dashboard", replace: true })
    },
  })

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutate({ email, password })
  }

  return (
    <form className="h-full p-6 bg-card rounded-4xl" onSubmit={handleSubmit}>
      <FieldLegend>
        <h1 className="text-2xl font-bold">Login to your account</h1>
      </FieldLegend>

      <div className="text-destructive">
        {isError && "Invalid email or password"}
      </div>

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

          <div className="flex justify-end">
            <Link
              type="button"
              className="text-primary underline"
              to="/auth/password/forgot"
            >
              Forgot password?
            </Link>
          </div>
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
          <Button
            type="submit"
            className="text-2xl flex-1 pt-6 pb-6"
            disabled={isPending}
          >
            <span>{"Login"}</span>
            {isPending && <Spinner />}
          </Button>
        </Field>

        <Field>
          <Button
            type="button"
            variant={"link"}
            onClick={() => {
              setEmail("")
              setPassword("")
              navigate({ search: { mode: "signup" } })
            }}
          >
            Create new account?
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default LoginForm

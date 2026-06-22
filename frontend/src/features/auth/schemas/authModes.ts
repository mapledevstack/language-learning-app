export const AUTH_MODE = {
  LOGIN: "login",
  SIGNUP: "signup",
} as const

export type AuthMode = (typeof AUTH_MODE)[keyof typeof AUTH_MODE]

export const VerificationCodes = {
  EmailVerification: "email_verification",
  PasswordReset: "password_reset",
} as const

export type VerificationCode =
  (typeof VerificationCodes)[keyof typeof VerificationCodes]

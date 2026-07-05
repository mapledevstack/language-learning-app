import resend from "../config/resend.js"
import { EMAIL_SENDER, NODE_ENV } from "../constants/env.js"

type Params = {
  to: string
  subject: string
  text: string
  html: string
}

const getFromEmail = () =>
  NODE_ENV === "development" ? "onboarding@resend.dev" : EMAIL_SENDER
const getToEmail = (toEmail: string) =>
  NODE_ENV === "development" ? "delivered@resend.dev" : toEmail

export const sendMail = async ({ to, subject, text, html }: Params) => {
  console.log({
    nodeEnv: process.env.NODE_ENV,
    from: getFromEmail(),
    hasApiKey: !!process.env.RESEND_API_KEY,
  })

  const response = await resend.emails.send({
    from: getFromEmail(),
    to: getToEmail(to),
    subject,
    text,
    html,
  })

  console.log(response)

  return response
}

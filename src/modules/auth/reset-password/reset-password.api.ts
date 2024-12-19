import httpClient from "@/utils/http-client"
import { useResetPassword } from "./reset-password.store"
import { newPasswordViewSchema, otpViewSchema } from "./reset-password.schema"
import { z } from "zod"
import { appRouter } from "@/main"
import { toast } from "sonner"

export async function sendOTP({
  email,
}: {
  email: string
}) {
  useResetPassword.setState({ email })
  httpClient.post("/auth/request-reset-password", { email: email })
  useResetPassword.getState().startResendOTPTimer()
  useResetPassword.setState({ currentView: "otp" })
}

export async function resendOTP() {
  const email = useResetPassword.getState().email
  return await httpClient
    .post("/auth/request-reset-password", { email: email })
    .then(() => useResetPassword.getState().startResendOTPTimer())
}

export async function verifyOTP({
  values,
}: {
  values: z.infer<typeof otpViewSchema>
}) {
  const email = useResetPassword.getState().email
  return await httpClient
    .post("/auth/check-reset-password-code", {
      email,
      verification_code: values.otp,
    })
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        useResetPassword.setState({
          otp: values.otp,
        })
        useResetPassword.setState({
          currentView: "new-password",
        })
      }
    })
    .catch((error) => {
      if (error.response.status === 422) throw new Error("The OTP is invalid")
    })
}

export async function resetPassword({
  values,
}: {
  values: z.infer<typeof newPasswordViewSchema>
}) {
  const email = useResetPassword.getState().email
  const otp = useResetPassword.getState().otp
  return await httpClient
    .post("/auth/reset-password", {
      password: values.password,
      password_confirmation: values.confirmPassword,
      email: email,
      verification_code: otp,
    })
    .then(() => {
      useResetPassword.setState({ ...useResetPassword.getInitialState() })
      appRouter.navigate({ to: "/login" })
      toast.success("Your password was successfully reset.")
    })
}

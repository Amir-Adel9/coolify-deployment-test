import EmailView from "./EmailView"
import OTPView from "./OTPView"
import NewPasswordView from "./NewPasswordView"
import { useResetPassword } from "./reset-password.store"

const ResetPassword = () => {
  const currentView = useResetPassword((state) => state.currentView)
  switch (currentView) {
    case "email":
      return <EmailView />
    case "otp":
      return <OTPView />
    case "new-password":
      return <NewPasswordView />
  }
}

export default ResetPassword

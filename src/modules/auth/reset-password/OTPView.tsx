import { Label } from "@/components/ui/shadcn/label"
import { useResetPassword } from "./reset-password.store"
import ResendOTPButton from "./components/ResendOTPButton"
import ChangeEmailButton from "./components/ChangeEmailButton"
import OTPForm from "./components/OTPForm"

const OTPView = () => {
  const enteredEmail = useResetPassword((state) => state.email)
  if (!enteredEmail)
    useResetPassword.setState({
      currentView: "email",
    })

  return (
    <div>
      <div className='w-full flex flex-col items-center gap-5'>
        <h2 className='text-center text-lg font-medium w-full text-muted-foreground'>
          Reset Password
        </h2>
        <div className='flex flex-col items-center gap-2'>
          <Label>Enter the OTP sent to the email:</Label>
          <Label className='text-sm text-muted-foreground block'>
            {enteredEmail || "No email was entered"}
          </Label>
        </div>
        <OTPForm />
      </div>
      <div className='w-full flex items-center justify-between mt-2'>
        <ResendOTPButton />
        <ChangeEmailButton />
      </div>
    </div>
  )
}

export default OTPView

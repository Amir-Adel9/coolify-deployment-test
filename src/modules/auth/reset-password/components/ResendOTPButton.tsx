import { Button } from "@/components/ui/shadcn/button"
import { resendOTP, sendOTP } from "../reset-password.api"
import { useResetPassword } from "../reset-password.store"

let isFirstCycle = true

const ResendOTPButton = () => {
  const resendOTPTimer = useResetPassword((state) => state.resendOTPTimer)
  const isResendOTPDisabled = useResetPassword(
    (state) => state.isResendOTPDisabled,
  )
  const startResendOTPTimer = useResetPassword(
    (state) => state.startResendOTPTimer,
  )

  if (resendOTPTimer === 0 && !isResendOTPDisabled && isFirstCycle) {
    sendOTP({
      email: useResetPassword.getState().email,
    })
    startResendOTPTimer()
    isFirstCycle = false
  }

  return (
    <Button
      type='button'
      className='text-secondary hover:underline'
      onClick={resendOTP}
      disabled={isResendOTPDisabled}
      variant={"link"}
    >
      Resend OTP
      {resendOTPTimer !== 0 && ` in ${resendOTPTimer}s`}
    </Button>
  )
}

export default ResendOTPButton

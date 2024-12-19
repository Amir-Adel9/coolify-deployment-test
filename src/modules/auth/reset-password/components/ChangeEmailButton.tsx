import { Button } from "@/components/ui/shadcn/button"
import { useResetPassword } from "../reset-password.store"

const ChangeEmailButton = () => {
  return (
    <Button
      type='button'
      className='text-secondary hover:underline'
      onClick={() => {
        useResetPassword.setState({
          ...useResetPassword.getInitialState(),
        })
      }}
      variant={"link"}
    >
      Change Email
    </Button>
  )
}

export default ChangeEmailButton

import { Button } from "@/components/ui/shadcn/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form"
import { newPasswordViewSchema } from "./reset-password.schema"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { resetPassword } from "./reset-password.api"
import PasswordInput from "@/components/ui/PasswordInput"

const NewPasswordView = () => {
  const newPasswordForm = useForm<z.infer<typeof newPasswordViewSchema>>({
    resolver: zodResolver(newPasswordViewSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  })

  const onSubmit = async () => {
    await resetPassword({
      values: newPasswordForm.getValues(),
    })
  }

  return (
    <Form {...newPasswordForm}>
      <form
        onSubmit={newPasswordForm.handleSubmit(onSubmit)}
        className='space-y-5 w-full'
      >
        <h2 className='text-center text-lg font-medium mb-4 w-full text-muted-foreground'>
          Reset Password
        </h2>
        <FormField
          control={newPasswordForm.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='Password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={newPasswordForm.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='Confirm Password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full'
          isLoading={newPasswordForm.formState.isSubmitting}
        >
          Change Password
        </Button>
      </form>
    </Form>
  )
}

export default NewPasswordView

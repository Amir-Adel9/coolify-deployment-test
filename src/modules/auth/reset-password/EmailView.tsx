import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form"
import { Input } from "@/components/ui/shadcn/input"
import { Button } from "@/components/ui/shadcn/button"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { emailViewSchema } from "./reset-password.schema"
import { sendOTP } from "./reset-password.api"
import { useResetPassword } from "./reset-password.store"

const EmailView = () => {
  const emailViewForm = useForm<z.infer<typeof emailViewSchema>>({
    resolver: zodResolver(emailViewSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  })

  if (useResetPassword((state) => state.email))
    useResetPassword.setState({ currentView: "otp" })

  return (
    <Form {...emailViewForm}>
      <form
        onSubmit={emailViewForm.handleSubmit(() => {
          sendOTP({
            email: emailViewForm.getValues().email,
          })
        })}
        className='space-y-5 w-full'
      >
        <h2 className='text-center text-lg font-medium mb-4 w-full text-muted-foreground'>
          Reset Password
        </h2>
        <FormField
          control={emailViewForm.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email' {...field} className='w-full' />
              </FormControl>
              <FormMessage />
              <FormDescription className='text-wrap w-80'>
                Enter your email address and you will be sent a code to reset
                your password.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full'
          isLoading={emailViewForm.formState.isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default EmailView

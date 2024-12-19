import { REGEXP_ONLY_DIGITS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/shadcn/input-otp"
import { otpViewSchema } from "../reset-password.schema"
import { zodResolver } from "@hookform/resolvers/zod"

import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/shadcn/form"
import { Button } from "@/components/ui/shadcn/button"
import { verifyOTP } from "../reset-password.api"
import { useForm } from "react-hook-form"

const OTPForm = () => {
  const otpViewForm = useForm<z.infer<typeof otpViewSchema>>({
    resolver: zodResolver(otpViewSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  })

  const onSubmit = async () => {
    await verifyOTP({
      values: otpViewForm.getValues(),
    }).catch(() =>
      otpViewForm.setError("otp", {
        type: "manual",
        message: "The OTP is invalid",
      }),
    )
  }

  return (
    <Form {...otpViewForm}>
      <form onSubmit={otpViewForm.handleSubmit(onSubmit)} className='space-y-5'>
        <FormField
          control={otpViewForm.control}
          name='otp'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  {...field}
                  onComplete={otpViewForm.handleSubmit(onSubmit)}
                >
                  <InputOTPGroup className='space-x-4'>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage className='text-center' />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full'
          isLoading={otpViewForm.formState.isSubmitting}
        >
          Verify
        </Button>
      </form>
    </Form>
  )
}

export default OTPForm

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form"
import { Input } from "@/components/ui/shadcn/input"
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/shadcn/button"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import loginFormSchema from "./login.schema"
import login from "./login.api"
import PasswordInput from "@/components/ui/PasswordInput"

const LoginForm = () => {
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  })

  const onSubmit = async () => {
    await login({
      values: loginForm.getValues(),
    }).catch(() => {
      loginForm.setError("email", {
        type: "manual",
        message: "",
      }),
        loginForm.setError("password", {
          type: "manual",
          message: "Invalid email or password",
        })
    })
  }

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(onSubmit)}
        className='space-y-5 w-full'
      >
        <FormField
          control={loginForm.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='Password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='text-sm font-medium text-right text-secondary hover:underline cursor-pointer underline-offset-4'>
          <Link to='/reset-password'>Forgot password?</Link>
        </div>
        <Button
          type='submit'
          className='w-full'
          isLoading={loginForm.formState.isSubmitting}
        >
          Login
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm

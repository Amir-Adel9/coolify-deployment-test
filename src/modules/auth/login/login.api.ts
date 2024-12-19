import { z } from "zod"
import loginFormSchema from "./login.schema"
import httpClient from "@/utils/http-client"
import { setCookie } from "@/utils/cookies"
import { useUser } from "@/stores/user.store"
import { appRouter } from "@/main"

async function login({
  values,
}: {
  values: z.infer<typeof loginFormSchema>
}) {
  const { setUser } = useUser.getState()

  await httpClient
    .post("/auth/login", values)
    .then((response) => response.data.data)
    .then((data) => {
      setCookie("token", data.token, 7)
      setUser({
        name: data.user.name,
        email: data.user.email,
        phoneNumber: data.user.phoneNumber,
        isVerified: data.user.isVerified,
        isBanned: data.user.isBanned,
        image: data.user.image,
        isAuthenticated: true,
      })

      const searchParams = Object.values(appRouter.parseLocation().search).join(
        "",
      )

      if (searchParams) {
        appRouter.navigate({ to: `/${searchParams}` })
      } else {
        appRouter.navigate({ to: "/" })
      }
    })
    .catch((error) => {
      if (error.response.data.message === "site.credentials_not_match_records")
        throw new Error("Invalid email or password")
    })
}

export default login

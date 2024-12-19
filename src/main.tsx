import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { ThemeProvider } from "./components/providers/theme-provider.tsx"
import queryClient from "./lib/query-client.ts"

import { routeTree } from "./routeTree.gen"
import { QueryClientProvider } from "@tanstack/react-query"

import "@/index.css"
import { useUser } from "./stores/user.store.ts"
import { getCookie } from "./utils/cookies.ts"
import { Toaster } from "./components/ui/shadcn/sonner.tsx"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

// Create a new router instance
export const appRouter = createRouter({ routeTree })

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof appRouter
  }
}

useUser.setState({
  isAuthenticated: getCookie("token") ? true : false,
})

// Render the app
const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme='light' storageKey='dashboard-ui-theme'>
          {/* <ReactQueryDevtools /> */}
          <RouterProvider router={appRouter} />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}

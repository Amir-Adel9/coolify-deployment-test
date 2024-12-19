import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/shadcn/breadcrumb"
import { Link, useRouterState } from "@tanstack/react-router"
import clsx from "clsx"
import { Home } from "lucide-react"

const Breadcrumbs = () => {
  const routerState = useRouterState()

  const currentPath = routerState.location.pathname
    .split("/")
    .slice(1)
    .filter(Boolean)

  const pathWithHome = ["home", ...currentPath]

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathWithHome.map((path, index) => (
          <BreadcrumbItem key={index}>
            {index === 0 ? (
              <BreadcrumbLink asChild>
                <Link to='/' className='capitalize'>
                  <span className='flex items-center gap-1'>
                    <Home className='w-4 h-4' /> {path}
                  </span>
                </Link>
              </BreadcrumbLink>
            ) : index < pathWithHome.length - 1 ? (
              <BreadcrumbLink asChild>
                <Link
                  to={`/${pathWithHome.slice(1, index + 1).join("/")}`}
                  className={clsx(
                    "capitalize",
                    path === "blog" && "pointer-events-none",
                  )}
                >
                  {path}
                </Link>
              </BreadcrumbLink>
            ) : (
              <span className='text-secondary font-semibold cursor-default capitalize'>
                {path}
              </span>
            )}
            {index < pathWithHome.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs

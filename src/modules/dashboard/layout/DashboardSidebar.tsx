import CreidenLogo from "@/components/icons/CreidenLogo"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/shadcn/sidebar"
import { Link } from "@tanstack/react-router"
import {
  Home,
  LayoutDashboard,
  Users,
  Info,
  Shield,
  Newspaper,
} from "lucide-react"

const DashboardSidebar = () => {
  const sidebarItems: {
    label: string
    items: {
      label: string
      icon: any
      link: string
    }[]
  }[] = [
    {
      label: "Main",
      items: [
        {
          label: "Home",
          icon: Home,
          link: "/",
        },
        {
          label: "About",
          icon: Info,
          link: "/about",
        },
      ],
    },
    {
      label: "Management",
      items: [
        {
          label: "Users",
          icon: Users,
          link: "/users",
        },
        {
          label: "Roles",
          icon: Shield,
          link: "/roles",
        },
      ],
    },
    {
      label: "Blog",
      items: [
        {
          label: "Articles",
          icon: Newspaper,
          link: "/blog/articles",
        },
        {
          label: "Categories",
          icon: LayoutDashboard,
          link: "/blog/categories",
        },
      ],
    },
  ]

  return (
    <SidebarProvider>
      <Sidebar className='w-64'>
        <SidebarHeader className='bg-secondary p-4'>
          <CreidenLogo className='text-white' />
        </SidebarHeader>
        <SidebarContent className='bg-secondary p-4'>
          {sidebarItems.map((group, index) => (
            <SidebarGroup key={index} className='mb-6'>
              <SidebarGroupLabel className='text-blue-200 text-xs font-semibold mb-2'>
                {group.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item, index) => (
                    <Link to={item.link} key={index} className='block mb-1'>
                      <SidebarMenuButton asChild>
                        <SidebarMenuItem className='rounded hover:bg-secondary-hovered transition-colors'>
                          <item.icon className='mr-3 h-4 w-4 text-blue-100' />
                          <span className='text-sm font-medium text-white'>
                            {item.label}
                          </span>
                        </SidebarMenuItem>
                      </SidebarMenuButton>
                    </Link>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
      <SidebarTrigger className='hidden max-md:inline h-16 bg-white p-5 rounded-none border-b border-border' />
    </SidebarProvider>
  )
}

export default DashboardSidebar

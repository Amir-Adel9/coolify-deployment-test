import DashboardHeader from "./DashboardHeader"
import DashboardSidebar from "./DashboardSidebar"

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='flex max-h-screen'>
      <DashboardSidebar />
      <div className='w-full h-full min-h-screen flex flex-col gap-10 p-4'>
        <DashboardHeader />
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout

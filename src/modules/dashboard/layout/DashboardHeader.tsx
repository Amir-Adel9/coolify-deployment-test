import Breadcrumbs from "./Breadcrumbs"
import HeaderControls from "./HeaderControls"

const DashboardHeader = () => {
  return (
    <div className='h-16 p-4 bg-white rounded flex gap-4 justify-around has-one-child:justify-end md:justify-between items-center border-b border-border'>
      <Breadcrumbs />
      <HeaderControls />
    </div>
  )
}

export default DashboardHeader

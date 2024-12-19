import { createFileRoute, Outlet } from "@tanstack/react-router"
import creidenLogo from "@/assets/images/creiden.webp"

export const Route = createFileRoute("/_auth/_auth")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='min-h-screen flex flex-col justify-center items-center '>
      <div className='absolute inset-0 w-full h-full opacity-50 bg-gradient-to-br from-[#245EC5]/20 to-[#245EC5]/5'>
        <svg
          className='w-full h-full'
          width='100%'
          height='100%'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <pattern
              id='dots'
              width='20'
              height='20'
              patternUnits='userSpaceOnUse'
            >
              <circle cx='2' cy='2' r='1' fill='#245EC5' />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#dots)' />
        </svg>
      </div>
      <div className='min-w-72 sm:min-w-96 flex flex-col justify-center items-center bg-white border border-border mx-6 sm:mx-auto p-6 rounded-md z-10'>
        <img
          src={creidenLogo}
          alt='Creiden Logo'
          className='w-24 h-24 object-cover'
          draggable={false}
        />
        <h1 className='text-xl mb-2 font-medium'>Creiden Dashboard</h1>
        <Outlet />
      </div>
    </main>
  )
}

import { Skeleton } from "../shadcn/skeleton"

const FormSkeleton = () => {
  return (
    <div>
      <Skeleton className='h-6 w-[30%]' />
      <div className='grid grid-cols-2 gap-4 mt-5 '>
        <Skeleton className='h-8 w-full' />
        <Skeleton className='h-8 w-full' />
        <Skeleton className='h-8 w-full col-span-full' />
        <Skeleton className='h-8 w-full' />
        <Skeleton className='h-8 w-full' />
        <div className='flex items-center justify-end col-span-full'>
          <Skeleton className='h-8 w-[25%]' />
        </div>
      </div>
    </div>
  )
}

export default FormSkeleton

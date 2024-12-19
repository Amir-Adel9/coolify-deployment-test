import { Skeleton } from "@/components/ui/shadcn/skeleton"

const RolesSkeleton = () => {
  return (
    <div className='w-full max-w-3xl mx-auto space-y-6'>
      <div className='space-y-2'>
        <Skeleton className='h-5 w-24' />
        <Skeleton className='h-10 w-full rounded-md' />
      </div>

      <Skeleton className='h-8 w-48 mx-auto mb-8' />

      <div className='space-y-8'>
        {[...Array(4)].map((_, i) => (
          <div className='space-y-4' key={i}>
            <Skeleton className='h-6 w-24' />

            <div className='flex flex-wrap gap-3'>
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className='h-9 w-32 rounded-full' />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-end mt-8'>
        <Skeleton className='h-10 w-24 rounded-md' />
      </div>
    </div>
  )
}

export default RolesSkeleton

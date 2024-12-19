import { AlertTriangle } from "lucide-react"
import Container from "./Container"
import { Button } from "@/components/ui/shadcn/button"
import { appRouter } from "@/main"

const Forbidden = () => {
  return (
    <Container>
      <div className='flex items-center justify-center'>
        <div className='max-w-md w-full rounded-lg p-8 text-center'>
          <AlertTriangle className='mx-auto text-secondary w-16 h-16 mb-4' />
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>
            Unauthorized Access
          </h2>
          <p className='text-muted-foreground'>
            You don't have the required permissions to view this page.
          </p>
          <Button
            onClick={() => appRouter.history.back()}
            className='mt-6 px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-hovered transition-colors'
          >
            Go Back
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default Forbidden

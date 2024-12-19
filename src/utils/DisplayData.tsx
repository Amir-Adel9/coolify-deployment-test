import { toast } from "sonner"

const DisplayData = ({ data }: { data: any }) => {
  return toast.message(
    <div className='text-sm p-4 w-[340px]'>
      <h1 className='text-sm font-bold'>You submitted the following values:</h1>
      <pre className='mt-2 rounded-md bg-slate-950 p-4 overflow-auto max-h-96'>
        <code className='text-white text-xs'>
          {JSON.stringify(data, null, 2)}
        </code>
      </pre>
    </div>,
  )
}

export default DisplayData

import { TFormField } from "@/types/form.types"
import clsx from "clsx"
import { Trash2, Upload } from "lucide-react"
import { useEffect, useState } from "react"
import Dropzone from "react-dropzone"

interface MediaUploaderProps {
  className?: string
  isMulti?: boolean
  formData?: any
  field: Extract<TFormField, { type: "image" }>
}

const MediaUploader = ({
  className,
  isMulti = false,
  formData,
  field,
}: MediaUploaderProps) => {
  const [filesData, setFilesData] = useState(
    formData.getValues(field.name) || [],
  )

  useEffect(() => {
    if (filesData.length > 0) {
      formData.setValue(field.name, filesData)
      formData.clearErrors(field.name)
    } else {
      formData.setValue(field.name, undefined)
    }
  }, [filesData])

  return (
    <div className={className}>
      <label
        htmlFor=''
        className={clsx(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize mb-3 inline-block",
          formData.formState.errors[field.name] && "text-destructive",
        )}
      >
        {field.label}{" "}
        {field.required && <span className='text-red-500'>*</span>}
      </label>
      <Dropzone
        multiple={isMulti}
        onDrop={(acceptedFiles) => {
          isMulti
            ? setFilesData([...filesData, ...acceptedFiles])
            : setFilesData(acceptedFiles)
        }}
        accept={{
          "image/*": [],
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section
            className={clsx(
              "border-2 border-dashed rounded w-full h-48",
              formData.formState.errors[field.name] && "border-red-500",
            )}
          >
            <div {...getRootProps()} className='h-full'>
              <input {...getInputProps()} />
              <div className='w-full h-full flex items-center justify-center gap-2 cursor-pointer'>
                <Upload />
                <p className='text-sm'>
                  {field.custom?.placeholder || `Upload ${field.label}`}
                </p>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      {formData.formState.errors[field.name] && (
        <p className='text-[0.8rem] font-medium text-destructive mt-1'>
          {formData.formState.errors[field.name].message ||
            formData.formState.errors[field.name].map(
              (error: any) => error.message,
            )}
        </p>
      )}

      <div className='flex items-center flex-wrap gap-4 mt-3'>
        {filesData?.map((file: any, index: number) => (
          <div className='relative' key={`${index} ${field.name}`}>
            <img
              src={file.full_path_small || URL.createObjectURL(file)}
              alt='uploaded'
              className='h-20 w-20 object-cover rounded'
            />
            <Trash2
              className='text-destructive absolute right-[-10px] top-[-10px] cursor-pointer'
              size={18}
              onClick={() =>
                setFilesData(
                  filesData.filter((_: any, i: number) => i !== index),
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MediaUploader

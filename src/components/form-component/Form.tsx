import clsx from "clsx"
import { Form } from "../ui/shadcn/form"
import { Button } from "../ui/shadcn/button"

const FormComponent = ({
  formData,
  onSubmit,
  className,
  fullHeight,
  formTitle,
  buttonText,
  buttonClassName,
  children,
}: {
  formData: any
  onSubmit: any
  className?: string
  fullHeight?: boolean
  formTitle?: string
  buttonText?: string
  buttonClassName?: string
  children: React.ReactNode
}) => {
  return (
    <Form {...formData}>
      <form
        onSubmit={formData.handleSubmit(onSubmit)}
        className={clsx(
          "w-full grid grid-cols-12 content-baseline gap-5 h-fit",
          fullHeight && "flex-1 h-full",
          className,
        )}
      >
        {formTitle && (
          <h1 className='text-2xl font-bold text-secondary mb-2 block col-span-12'>
            {formTitle}
          </h1>
        )}
        {children}
        <Button
          type='submit'
          className={clsx(
            "mt-5 block col-span-full justify-self-end",
            buttonClassName,
          )}
          isLoading={formData.formState.isSubmitting}
        >
          {buttonText || "Submit"}
        </Button>
      </form>
    </Form>
  )
}

export default FormComponent

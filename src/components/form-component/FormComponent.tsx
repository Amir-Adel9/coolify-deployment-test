import { Form } from "@/components/ui/shadcn/form"
import { Button } from "@/components/ui/shadcn/button"
import clsx from "clsx"
import MediaUploader from "./custom-fields/MediaUploader"
import { Fragment } from "react/jsx-runtime"
import SelectInput from "./custom-fields/SelectInput"
import CheckboxInput from "./custom-fields/CheckboxInput"
import TextAreaInput from "./custom-fields/TextAreaInput"
import ComboBoxInput from "./custom-fields/ComboBoxInput"
import OtherInput from "./custom-fields/OtherInput"
import PasswordFormInput from "./custom-fields/PasswordFormInput"
import TextEditorInput from "./custom-fields/TextEditorInput"
import { MultiSelect } from "./custom-fields/MultiSelectInput"

type TFormComponentProps = {
  fields: any
  handleSubmit: any
  formData: any
  className?: string
  buttonClassName?: string
  buttonText?: string
  fullHeight?: boolean
  formTitle?: string
  isLoading?: boolean
}

const FormComponent = ({
  fields,
  handleSubmit,
  formData,
  className,
  buttonClassName,
  buttonText,
  fullHeight,
  formTitle,
  isLoading,
}: TFormComponentProps) => {
  return (
    <div className=''>
      <Form {...formData}>
        <form
          onSubmit={formData.handleSubmit(handleSubmit)}
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
          {fields.map((field: any) => (
            <Fragment key={field.name}>
              {field.type === "image" ? (
                <MediaUploader
                  className={clsx(field.className, "h-fit")}
                  isMulti={field?.custom?.isMulti}
                  formData={formData}
                  field={field}
                />
              ) : field.type === "checkbox" ? (
                <CheckboxInput field={field} formData={formData} />
              ) : field.type === "select" ? (
                <SelectInput field={field} formData={formData} />
              ) : field.type === "textarea" ? (
                <TextAreaInput field={field} formData={formData} />
              ) : field.type === "combobox" ? (
                <ComboBoxInput field={field} formData={formData} />
              ) : field.type === "password" ? (
                <PasswordFormInput field={field} formData={formData} />
              ) : field.type === "textEditor" ? (
                <TextEditorInput field={field} formData={formData} />
              ) : field.type === "multiSelect" ? (
                <MultiSelect field={field} formData={formData} />
              ) : (
                <OtherInput field={field} formData={formData} />
              )}
            </Fragment>
          ))}
          <Button
            type='submit'
            className={clsx(
              " mt-5 block col-span-full self-end",
              buttonClassName,
            )}
            isLoading={formData.formState.isSubmitting || isLoading}
          >
            {buttonText || "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default FormComponent

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form"
import { Textarea } from "@/components/ui/shadcn/textarea"
import { TFormField } from "@/types/form.types"
import clsx from "clsx"

type TCheckboxInputProps = {
  field: Extract<TFormField, { type: "textarea" }>
  formData: any
}
const TextAreaInput = ({ field, formData }: TCheckboxInputProps) => {
  return (
    <FormField
      control={formData.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem className={clsx(field.className, "h-fit")}>
          <FormLabel
            className={clsx(field?.custom?.labelClassName || "", "capitalize")}
          >
            {field.label}{" "}
            {field.required && <span className='text-red-500'>*</span>}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={field.custom?.placeholder || `Enter ${field.label}`}
              className={clsx(field.custom?.inputClassName)}
              {...formField}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default TextAreaInput

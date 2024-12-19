import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form"
import { Input } from "@/components/ui/shadcn/input"
import { TFormField } from "@/types/form.types"
import clsx from "clsx"

type TOtherInputProps = {
  field: Extract<TFormField, { type: "text" }>
  formData: any
}

const OtherInput = ({ field, formData }: TOtherInputProps) => {
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
            <Input
              placeholder={field.custom?.placeholder || `Enter ${field.label}`}
              type={field.type}
              {...formField}
              className={field.custom?.inputClassName || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default OtherInput

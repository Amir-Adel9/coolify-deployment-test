import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/shadcn/form"
import clsx from "clsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/shadcn/select"
import { TFormField } from "@/types/form.types"

type TSelectInputProps = {
  field: Extract<TFormField, { type: "select" }>
  formData: any
}

const SelectInput = ({ formData, field }: TSelectInputProps) => {
  return (
    <FormField
      control={formData.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem className={clsx(field.className)}>
          <FormLabel>
            {field.label}{" "}
            {field.required && <span className='text-red-500'>*</span>}
          </FormLabel>
          <Select
            onValueChange={formField.onChange}
            defaultValue={formField.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    field.custom?.placeholder || `Select ${field.label}`
                  }
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {field?.custom?.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default SelectInput

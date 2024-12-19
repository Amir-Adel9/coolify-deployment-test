import { Checkbox } from "@/components/ui/shadcn/checkbox"
import { FormControl, FormField, FormItem } from "@/components/ui/shadcn/form"
import { TFormField } from "@/types/form.types"
import clsx from "clsx"

type TCheckboxInputProps = {
  field: Extract<TFormField, { type: "checkbox" }>
  formData: any
}

const CheckboxInput = ({ formData, field }: TCheckboxInputProps) => {
  return (
    <FormField
      control={formData.control}
      name={field.name}
      render={() => (
        <FormItem className={clsx(field.className, "flex items-center gap-2")}>
          <FormControl>
            <Checkbox
              id={`${field.name}-checkbox`}
              checked={formData.getValues(field.name)}
              onCheckedChange={(checked) => {
                return checked
                  ? formData.setValue(field.name, true)
                  : formData.setValue(field.name, false)
              }}
            />
          </FormControl>
          <label
            htmlFor={`${field.name}-checkbox`}
            className='text-sm font-medium !m-0'
          >
            {field.label}
          </label>
        </FormItem>
      )}
    />
  )
}

export default CheckboxInput

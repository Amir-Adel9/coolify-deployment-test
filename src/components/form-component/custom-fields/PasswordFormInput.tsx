import PasswordInput from "@/components/ui/PasswordInput"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form"
import { TFormField } from "@/types/form.types"

type TPasswordFormInputProps = {
  field: Extract<TFormField, { type: "textarea" }>
  formData: any
}
const PasswordFormInput = ({ field, formData }: TPasswordFormInputProps) => {
  return (
    <FormField
      control={formData.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem className={field.className}>
          <FormLabel>
            {field.label}{" "}
            {field.required && <span className='text-red-500'>*</span>}
          </FormLabel>
          <FormControl>
            <PasswordInput
              {...formField}
              placeholder='Password'
              // className='w-full'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default PasswordFormInput

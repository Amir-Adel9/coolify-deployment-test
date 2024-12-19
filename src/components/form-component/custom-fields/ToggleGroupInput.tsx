import { TFormField } from "@/types/form.types"

type TToggleGroupProps = {
  field: Extract<TFormField, { type: "toggleGroup" }>
  formData: any
}

const ToggleGroupInput = ({ field, formData }: TToggleGroupProps) => {
  return <div>ToggleGroupInput</div>
}

export default ToggleGroupInput

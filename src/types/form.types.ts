type TFormFieldTypes =
  | "text"
  | "number"
  | "checkbox"
  | "textarea"
  | "image"
  | "select"
  | "combobox"
  | "password"
  | "email"
  | "textEditor"
  | "multiSelect"
  | "toggleGroup"

type TOptions = {
  value: string
  label: string
}

interface BaseFormField {
  name: string
  label: string
  type: TFormFieldTypes
  className?: string
  required?: boolean
}

interface customFormFieldOptions {
  image: {
    isMulti?: boolean
    placeholder?: string
  }

  select: {
    options: TOptions[]
    placeholder?: string
  }

  combobox: {
    options: TOptions[]
    placeholder?: string
    searchPlaceholder?: string
    listClassName?: string
  }

  checkbox: {}

  number: {
    labelClassName?: string
    inputClassName?: string
    placeholder?: string
  }

  text: {
    labelClassName?: string
    inputClassName?: string
    placeholder?: string;
    inputMode?: string;
  }

  password: {
    labelClassName?: string
    inputClassName?: string
    placeholder?: string
  }

  textarea: {
    labelClassName?: string
    inputClassName?: string
    placeholder?: string
  }

  email: {
    placeholder?: string;
    inputClassName?: string;
    inputMode?: string;
  };
  multiSelect: {
    options: {
      value: string | number
      label: string
      icon?: React.ComponentType<{ className?: string }>
    }[]
    placeholder?: string
    numberDisplayed?: number
  }

  toggleGroup: {
    options: { value: string; label: string }[]
  }

  textEditor: { labelClassName?: string; inputClassName?: string }
}

type FieldType = keyof customFormFieldOptions

export type TFormField = {
  [K in FieldType]: BaseFormField & {
    type: K
    custom?: customFormFieldOptions[K]
  }
}[FieldType]

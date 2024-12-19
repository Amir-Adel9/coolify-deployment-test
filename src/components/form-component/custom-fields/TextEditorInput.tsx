import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form"
import { TFormField } from "@/types/form.types"
import clsx from "clsx"
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"

type TTextEditorInputProps = {
  field: Extract<TFormField, { type: "textEditor" }>
  formData: any
}
const TextEditorInput = ({ field, formData }: TTextEditorInputProps) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  }

  const formats = [
    // 'header',
    "font",
    // 'size',
    "bold",
    "italic",
    "underline",
    "strike",
    // 'blockquote',
    "list",
    // 'bullet',
    // 'indent',
    "link",
    "image",
    "video",
  ]

  return (
    <FormField
      control={formData.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem className={clsx(field.className)}>
          <FormLabel className={clsx(field.custom?.labelClassName)}>
            {field.label}{" "}
            {field.required && <span className='text-red-500'>*</span>}
          </FormLabel>
          <FormControl>
            <div>
              <ReactQuill
                theme='snow'
                value={formField.value}
                onChange={formField.onChange}
                className={clsx(field.custom?.inputClassName)}
                modules={modules}
                formats={formats}
                style={{
                  overflow: "auto",
                }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default TextEditorInput

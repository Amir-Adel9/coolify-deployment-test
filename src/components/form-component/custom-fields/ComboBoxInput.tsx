import { Button } from "@/components/ui/shadcn/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/shadcn/command"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover"
import { cn } from "@/lib/tailwind-merge"
import { TFormField } from "@/types/form.types"
import clsx from "clsx"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { useState } from "react"

type TComboboxInputProps = {
  field: Extract<TFormField, { type: "combobox" }>
  formData: any
}
const ComboBoxInput = ({ field, formData }: TComboboxInputProps) => {
  const [open, setOpen] = useState(false)

  return (
    <FormField
      control={formData.control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem className={clsx(field.className, "flex flex-col")}>
          <FormLabel className='mt-2'>
            {field.label}{" "}
            {field.required && <span className='text-red-500'>*</span>}
          </FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <FormControl>
              <PopoverTrigger asChild>
                <Button
                  variant='ghost'
                  role='combobox'
                  aria-expanded={open}
                  className='justify-between border border-input shadow-sm hover:bg-transparent font-normal capitalize'
                >
                  {field.custom?.options.find(
                    (opt) => opt.value === formField.value,
                  )?.label ||
                    field.custom?.placeholder ||
                    `Select ${field.label}`}
                  <div className='flex items-center'>
                    {formField.value && (
                      <span
                        onClick={() => formData.setValue(formField.name, "")}
                      >
                        <X className='text-neutral-400' />
                      </span>
                    )}
                    <ChevronsUpDown className='opacity-50' />
                  </div>
                </Button>
              </PopoverTrigger>
            </FormControl>
            <PopoverContent
              className={clsx(field.custom?.listClassName, "p-0")}
            >
              <Command>
                <CommandInput
                  placeholder={
                    field.custom?.searchPlaceholder ||
                    `Search ${field.label}...`
                  }
                  className='h-9'
                />
                <CommandList>
                  <CommandEmpty>No {field.label} found.</CommandEmpty>
                  <CommandGroup>
                    {field.custom?.options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(currentValue) => {
                          formField.onChange(
                            option.value === currentValue ? option.value : "",
                          )
                          setOpen(false)
                        }}
                        className='!hover:bg-red-100'
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            formField.value === option.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ComboBoxInput

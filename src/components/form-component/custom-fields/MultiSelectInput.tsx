// src/components/multi-select.tsx

import * as React from "react"
import {
  CheckIcon,
  XCircle,
  ChevronDown,
  XIcon,
  WandSparkles,
} from "lucide-react"

import { Separator } from "@/components/ui/shadcn/separator"
import { Button } from "@/components/ui/shadcn/button"
import { Badge } from "@/components/ui/shadcn/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/shadcn/command"
import clsx from "clsx"
import { TFormField } from "@/types/form.types"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form"

interface MultiSelectProps {
  field: Extract<TFormField, { type: "multiSelect" }>
  formData: any
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(({ field, formData }, ref) => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>(
    formData.getValues(field.name) || [],
  )
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

  const clearError = () => {
    formData.clearErrors(field.name)
  }

  React.useEffect(() => {
    clearError()
  }, [selectedValues])

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsPopoverOpen(true)
    } else if (event.key === "Backspace" && !event.currentTarget.value) {
      const newSelectedValues = [...selectedValues]
      newSelectedValues.pop()
      setSelectedValues(newSelectedValues)
      formData.setValue(field.name, newSelectedValues)
    }
  }

  const toggleOption = (option: string) => {
    const newSelectedValues = selectedValues.includes(option)
      ? selectedValues.filter((value) => value !== option)
      : [...selectedValues, option]
    setSelectedValues(newSelectedValues)
    formData.setValue(field.name, newSelectedValues)
  }

  const handleClear = () => {
    setSelectedValues([])
    formData.setValue(field.name, [])
  }

  const handleTogglePopover = () => {
    setIsPopoverOpen((prev) => !prev)
  }

  const clearExtraOptions = () => {
    const newSelectedValues = selectedValues.slice(0, 3)
    setSelectedValues(newSelectedValues)
    formData.setValue(field.name, newSelectedValues)
  }

  const toggleAll = () => {
    if (selectedValues.length === field.custom?.options.length) {
      handleClear()
    } else {
      const allValues = field.custom?.options.map((option) => option.value.toString())
      setSelectedValues(allValues || [])
      formData.setValue(field.name, allValues)
    }
  }

  return (
    <FormField
      control={formData.control}
      name={field.name}
      render={() => (
        <FormItem className={clsx(field.className)}>
          <FormLabel>
            {field.label}{" "}
            {field.required && <span className='text-red-500'>*</span>}
          </FormLabel>
          <Popover
            open={isPopoverOpen}
            onOpenChange={setIsPopoverOpen}
            modal={true}
          >
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  ref={ref}
                  onClick={handleTogglePopover}
                  className={clsx(
                    "flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto",
                  )}
                >
                  {selectedValues.length > 0 ? (
                    <div className='flex justify-between items-center w-full'>
                      <div className='flex flex-wrap items-center'>
                        {selectedValues
                          .slice(0, field.custom?.numberDisplayed || 3)
                          .map((value) => {
                            const option = field?.custom?.options.find(
                              (o) => o.value === value,
                            )
                            const IconComponent = option?.icon
                            return (
                              <Badge key={value} variant='secondary'>
                                {IconComponent && (
                                  <IconComponent className='h-4 w-4 mr-2' />
                                )}
                                {option?.label}
                                <XCircle
                                  className='ml-2 h-4 w-4 cursor-pointer'
                                  onClick={(event) => {
                                    event.stopPropagation()
                                    toggleOption(value)
                                  }}
                                />
                              </Badge>
                            )
                          })}
                        {selectedValues.length >
                          (field.custom?.numberDisplayed || 3) && (
                          <Badge
                            className={clsx(
                              "bg-transparent text-foreground border-foreground/1 hover:bg-transparent",
                            )}
                          >
                            {`+ ${selectedValues.length - (field.custom?.numberDisplayed || 3)} more`}
                            <XCircle
                              className='ml-2 h-4 w-4 cursor-pointer'
                              onClick={(event) => {
                                event.stopPropagation()
                                clearExtraOptions()
                              }}
                            />
                          </Badge>
                        )}
                      </div>
                      <div className='flex items-center justify-between'>
                        <XIcon
                          className='h-4 mx-2 cursor-pointer text-muted-foreground'
                          onClick={(event) => {
                            event.stopPropagation()
                            handleClear()
                          }}
                        />
                        <Separator
                          orientation='vertical'
                          className='flex min-h-6 h-full'
                        />
                        <ChevronDown className='h-4 mx-2 cursor-pointer text-muted-foreground' />
                      </div>
                    </div>
                  ) : (
                    <div className='flex items-center justify-between w-full mx-auto'>
                      <span className='text-sm text-muted-foreground mx-3'>
                        {field.custom?.placeholder || "Select options"}
                      </span>
                      <ChevronDown className='h-4 cursor-pointer text-muted-foreground mx-2' />
                    </div>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto p-0'
              align='start'
              onEscapeKeyDown={() => setIsPopoverOpen(false)}
            >
              <Command>
                <CommandInput
                  placeholder='Search...'
                  onKeyDown={handleInputKeyDown}
                />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      key='all'
                      onSelect={toggleAll}
                      className='cursor-pointer'
                    >
                      <div
                        className={clsx(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          selectedValues.length === field.custom?.options.length
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        <CheckIcon className='h-4 w-4 bg-secondary rounded' />
                      </div>
                      <span>(Select All)</span>
                    </CommandItem>
                    {field.custom?.options.map((option: any) => {
                      const isSelected = selectedValues.includes(option.value)
                      return (
                        <CommandItem
                          key={option.value}
                          onSelect={() => toggleOption(option.value)}
                          className='cursor-pointer'
                        >
                          <div
                            className={clsx(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50 [&_svg]:invisible",
                            )}
                          >
                            <CheckIcon className='h-4 w-4 bg-secondary rounded' />
                          </div>
                          {option.icon && (
                            <option.icon className='mr-2 h-4 w-4 text-muted-foreground' />
                          )}
                          <span>{option.label}</span>
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup>
                    <div className='flex items-center justify-between'>
                      {selectedValues.length > 0 && (
                        <>
                          <CommandItem
                            onSelect={handleClear}
                            className='flex-1 justify-center cursor-pointer'
                          >
                            Clear
                          </CommandItem>
                          <Separator
                            orientation='vertical'
                            className='flex min-h-6 h-full'
                          />
                        </>
                      )}
                      <CommandItem
                        onSelect={() => setIsPopoverOpen(false)}
                        className='flex-1 justify-center cursor-pointer max-w-full'
                      >
                        Close
                      </CommandItem>
                    </div>
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
})

MultiSelect.displayName = "MultiSelect"

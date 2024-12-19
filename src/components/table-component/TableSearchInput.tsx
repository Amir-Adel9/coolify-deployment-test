import { useEffect, useState } from "react"
import { Input } from "../ui/shadcn/input"
import { Search } from "lucide-react"
import clsx from "clsx"
import { useNavigate, useSearch } from "@tanstack/react-router"

type TableSearchInputProps = {
  onDebouncedChange?: (value: string) => void
  debounceDelay?: number
  className?: string
  placeholder?: string
  searchValue?: string
}

const TableSearchInput = ({
  onDebouncedChange,
  debounceDelay = 1000,
  className,
  placeholder,
  searchValue,
}: TableSearchInputProps) => {
  const navigate: any = useNavigate()
  const [searchText, setSearchText] = useState(searchValue || "")
  const [debouncedSearch, setDebouncedSearch] = useState(searchText)
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText)
    }, debounceDelay)

    return () => clearTimeout(handler)
  }, [searchText, debounceDelay])

  useEffect(() => {
    if (onDebouncedChange) {
      onDebouncedChange(debouncedSearch)
      if (!firstLoad) {
        navigate({
          search: (prev: any) => {
            return {
              ...prev,
              page: 1,
              search: searchText,
            }
          },
        })
      }
    }
  }, [debouncedSearch])

  return (
    <div className={clsx("relative", className)}>
      <Input
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value)
          setFirstLoad(false)
        }}
        className='pr-[26px] w-full focus-visible:ring-0'
        placeholder={placeholder || "Search"}
      />
      <Search
        className='text-neutral-300 absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2'
        size={18}
      />
    </div>
  )
}

export default TableSearchInput

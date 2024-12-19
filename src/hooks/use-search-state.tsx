import { useState, useEffect } from "react"
import { useSearch } from "@tanstack/react-router"

export function useSearchState() {
  const { search: searchParams }: any = useSearch({ strict: false })
  const [searchValue, setSearchValue] = useState(searchParams || "")

  useEffect(() => {
    if (searchParams) {
      setSearchValue(searchParams)
    }
  }, [searchParams])

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
  }

  return { search: searchValue, setSearch: handleSearchChange }
}

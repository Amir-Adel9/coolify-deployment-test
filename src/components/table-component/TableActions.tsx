import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/shadcn/alert-dialog"
import { Button } from "@/components/ui/shadcn/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu"
import { EllipsisVertical, Pencil, Trash } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import LoadingDots from "../ui/LoadingDots"

type TableActionsProps = {
  onEdit: (e: any) => void
  onDelete: (e: any) => void
  deleteTitle?: string
  deleteMessage?: string
  isLoading?: boolean
}

const TableActions = ({
  onEdit,
  onDelete,
  deleteTitle,
  deleteMessage,
  isLoading,
}: TableActionsProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(isLoading)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const handleAlertClose = (open: boolean) => {
    setShowDeleteAlert(open)
    if (!open) {
      triggerRef.current?.focus()
      // Prevent the row click
      setTimeout(() => {
        document.body.click()
      }, 0)
    }
  }

  const handleDeleteClick = (e: any) => {
    e.stopPropagation()
    setIsDropdownOpen(false)
    setShowDeleteAlert(true)
  }

  const deleteConfirmation = (e: any) => {
    setIsDeleting(true)
    e.stopPropagation()
    onDelete(e)
  }

  useEffect(() => {
    setIsDeleting(isLoading)
    if (!isLoading) {
      setShowDeleteAlert(false)
    }
  }, [isLoading])

  return (
    <div>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='h-8 w-8 p-0'
            ref={triggerRef}
            onClick={(e) => e.stopPropagation()}
          >
            <span className='sr-only'>Open menu</span>
            <EllipsisVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              onEdit(e)
            }}
          >
            <Pencil className='mr-2 h-4 w-4' />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteClick}>
            <Trash className='mr-2 h-4 w-4' />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteAlert} onOpenChange={handleAlertClose}>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {deleteTitle || "Are you sure to delete this?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {deleteMessage ||
                "This action cannot be undone. This will permanently delete this record"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button
                onClick={(e) => e.stopPropagation()}
                className='text-black outline-none'
              >
                Cancel
              </Button>
            </AlertDialogCancel>
            <Button
              variant='destructive'
              disabled={isDeleting}
              onClick={(e) => deleteConfirmation(e)}
            >
              {isDeleting ? <LoadingDots /> : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default TableActions

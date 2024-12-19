import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table"
import { Skeleton } from "@/components/ui/shadcn/skeleton"

export function TableSkeleton({ columns }: { columns: string[] }) {
  return (
    <Table className='border rounded-lg'>
      <TableHeader>
        <TableRow>
          {columns.map((column: any, index) => (
            <TableHead key={`header-${index}`}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow key={index}>
            {columns.map((column: any, index) => (
              <TableCell
                className='font-medium'
                key={`${column.header} ${index}`}
              >
                <Skeleton className='h-6 w-[90%]' />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
